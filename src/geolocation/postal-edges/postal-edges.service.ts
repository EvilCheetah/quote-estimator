import { Node } from '@class/node.class'
import { Graph } from '@common/class/graph.class';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { throws } from 'assert';
import { PostalEdge } from 'src/common/types/postal-edge.type';
import { PostalEdgeDTO } from './dto/postal-edge.dto';


@Injectable()
export class PostalEdgesService implements OnModuleInit    
{
    private readonly logger      = new Logger(PostalEdgesService.name);
    private readonly postalGraph = new Graph();

    constructor(
        private readonly prisma:      PrismaService,
    ) {}

    create(postalEdgeDTO: PostalEdgeDTO)
    {
        const { origin, destination, ...data } = postalEdgeDTO;

        return this.prisma.postalEdge.createMany({
            data: [
                { node_id: origin,      child_node_id: destination, ...data },
                { node_id: destination, child_node_id: origin,      ...data }
            ],
            skipDuplicates: true,
        });
    }

    findAll()
    {
        return this.prisma.postalEdge.findMany();
    }

    findOne(node_id: number, child_node_id?: number)
    {
        return this.prisma.postalEdge.findMany({
            where: { node_id, child_node_id }
        });
    }

    getDistance(origin: number, desination: number)
    {   
        const start = Date.now();

        const edge = this.postalGraph.get_edge(origin, desination);

        this.logger.debug(`Getting a distance took: ${Date.now() - start}ms`);

        return edge;
    }

    update(postalEdgeDTO: PostalEdgeDTO)
    {
        const { origin, destination, ...data } = postalEdgeDTO;
        
        return this.prisma.postalEdge.updateMany({
            where: {
                OR: [
                    { node_id: origin,      child_node_id: destination },
                    { node_id: destination, child_node_id: origin      }
                ]
            },
            data
        });
    }

    remove(postalEdgeDTO: PostalEdge)
    {
        const { origin, destination } = postalEdgeDTO;

        return this.prisma.postalEdge.deleteMany({
            where: {
                OR: [
                    { node_id: origin,      child_node_id: destination },
                    { node_id: destination, child_node_id: origin      }
                ]
            }
        });
    }

    async onModuleInit() 
    {
        /// DEBUG
        let home_node;

        const nodes = await this.prisma.postalCode.findMany();
        
        for (const node of nodes)
        {
            /// DEBUG
            if (node.postal_code_value === '95660')
                home_node = node.postal_code_id;

            this.postalGraph.add_node(node);
        }

        const edges = await this.prisma.postalEdge.findMany();

        const start = Date.now();
        this.logger.log('Begin populating the Graph...');


        for (const edge of edges)
        {
            const { node_id: origin, child_node_id: destination, ...distances } = edge;

            this.postalGraph.add_edge({ origin, destination, ...distances });
        }
        
        this.logger.debug(
            `Up Time in: ${Date.now() - start}ms`
        );
        this.logger.debug(
            `Home Postal Code:     "${this.postalGraph.get_node(home_node)?.value ?? 'NOT FOUND'}"`
        );
        this.logger.debug(
            `Neighbor Postal Code: "${this.postalGraph.get_node(home_node)?.adjacent?.size ?? 'NOT FOUND'}"`
        );
    }
}
