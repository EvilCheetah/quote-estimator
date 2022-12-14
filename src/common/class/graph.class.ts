
import { Distances } from '@interface/distances.interface';
import { Node } from './node.class';
import { ID as NodeID } from '@types';
import { PostalCode } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { R_MI } from '@constant/variables/earth-radius';
import { ExplicitEdge } from '@interface/explicit-edge.interface';
import { MI_TO_M } from '@constant/variables/mi-to-m.constant';


export class Graph
{
    private readonly nodes  = new Map< NodeID, Node >();
    private readonly logger = new Logger(Graph.name);

    add_node(n: PostalCode)
    {
        const node = this.nodes.get(n.postal_code_id);

        if ( !node )
        {
            this.nodes.set(
                n.postal_code_id,
                new Node( n )
            );
        }
    }

    get_node(node_id: NodeID): Node | undefined
    {
        return this.nodes.get(node_id)
    }

    remove_node(node_id: NodeID)
    {
        const node = this.get_node(node_id);
        
        if (!node)
            throw new Error(`Node with ID: "${node_id}" was NOT FOUND`)
        
        for (const adjacent of node.adjacent.keys())
            this.remove_edge(node_id, adjacent)

        this.nodes.delete(node_id);
    }

    add_edge({ origin, destination, ...distances }: ExplicitEdge)
    {
        this.nodes.get(origin).adjacent.set(destination, distances);
        this.nodes.get(destination).adjacent.set(origin, distances);
    }

    get_edge(origin: NodeID, desination: NodeID)
    {
        const origin_node      = this.nodes.get(origin);
        const destination_node = this.nodes.get(desination);

        if ( !( origin_node && destination_node) )
            return null;
        
        const edge = origin_node.adjacent.get(desination);

        if ( !edge )
            return this._A_Star(origin, desination);
        
        const { land_distance, water_distance } = edge;

        return {
            origin_node:      origin_node.value,
            destination_node: destination_node.value,
            land_distance:    land_distance  / MI_TO_M,
            water_distance:   water_distance / MI_TO_M,
            air_distance:     this._heuristic(origin, desination)
        };
    }

    remove_edge(origin: NodeID, destination: NodeID)
    {
        const origin_node      = this.nodes.get(origin);
        const destination_node = this.nodes.get(destination);

        if ( !( origin_node && destination_node) )
            return;
        
        origin_node.adjacent.delete(destination);
        destination_node.adjacent.delete(origin);
    }

    private _A_Star(start: NodeID, goal: NodeID)
    {
        this.logger.debug('Using A*...');

        const open_set  = new Set<NodeID>([start]);
        const came_from = new Map<NodeID, NodeID>();

        const g_score   = new Map<NodeID, number>();
        const f_score   = new Map<NodeID, number>();
        
        for (const node of this.nodes.keys())
            g_score.set(node, Number.POSITIVE_INFINITY);
        
        for (const node of this.nodes.keys())
            f_score.set(node, Number.POSITIVE_INFINITY);

        g_score.set( start, 0 );

        this.logger.debug(`Before heuristic...`);

        f_score.set( start, this._heuristic(start, goal) );

        this.logger.debug(`Before heuristic...`);

        while ( open_set.size )
        {
            /// Get 'current_node_id' by reducing open_set node_ids by f_score weight
            const [current] = (
                [...f_score.entries()]
                    .filter( ([ node_id ]) => (open_set.has(node_id)) )
                    .reduce( (previous, current) => (previous[1] < current[1] ? previous : current) )
            );
            
            if (current === goal)
                return this._reconstruct_path(came_from, current);
            
            open_set.delete(current);

            
            for (const neighbor of this.nodes.get(current).adjacent.keys())
            {
                const { land_distance, water_distance } = this.nodes.get(current).adjacent.get(neighbor);

                const tentative_g_score = g_score.get(current) + land_distance + 10 * water_distance;
                if ( tentative_g_score < g_score.get(neighbor) )
                {
                    came_from.set(neighbor, current);
                    g_score.set(neighbor, tentative_g_score);
                    f_score.set(neighbor, tentative_g_score + this._heuristic(neighbor, goal));

                    if ( !open_set.has(neighbor) )
                        open_set.add(neighbor);
                }
            }
        }

        return null;
    }

    private _reconstruct_path(came_from: Map<NodeID, NodeID>, current: NodeID)
    {
        let   land_distance  = 0;
        let   water_distance = 0
        const goal           = current;

        while ( came_from.has(current) )
        {
            const origin = came_from.get(current);
            const {
                land_distance: land,
                water_distance: water
            } = this.nodes.get(origin).adjacent.get(current);

            current         = origin;
            land_distance  += land;
            water_distance += water;

        }

        return {
            origin:         this.get_node(current).value,
            destination:    this.get_node(  goal ).value,
            land_distance:  land_distance  / MI_TO_M,
            water_distance: water_distance / MI_TO_M,
            air_distance:   this._heuristic(current, goal)
        }
    }

    private _heuristic(node_id: NodeID, goal_id: NodeID): number
    {
        this.logger.debug(`Inside Heuristic...`)

        return this._get_distance_using_harversine(node_id, goal_id);
    }


    /// Calculates a distance between two (Latitude, Longitude) using
    /// Haversine formula
    /// Source: StackOverflow - https://bit.ly/2MFO3wj
    private _get_distance_using_harversine(origin: NodeID, desination: NodeID): number
    {
        const origin_node      = this.get_node(origin);
        const destination_node = this.get_node(desination);

        const { latitude: lat_1, longitude: lon_1 } = origin_node.coordinates,
              { latitude: lat_2, longitude: lon_2 } = destination_node.coordinates;

        const phi_1 =      lat_1      * (Math.PI / 180),
              phi_2 =      lat_2      * (Math.PI / 180),
              d_phi = (lat_2 - lat_1) * (Math.PI / 180),
              d_lam = (lon_2 - lon_1) * (Math.PI / 180);
        
        const a = Math.sin(d_phi / 2) ** 2 +
                  Math.sin(d_lam / 2) ** 2 *
                  Math.cos(phi_1) * Math.cos(phi_2);
        
        const c = 2 * Math.atan2( Math.sqrt(a), Math.sqrt(1 - a) );
        
        return R_MI * c;
    }

}