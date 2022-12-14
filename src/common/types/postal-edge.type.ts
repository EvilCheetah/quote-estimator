import { PostalEdgeDTO } from "src/geolocation/postal-edges/dto/postal-edge.dto";


export type PostalEdge = Omit<PostalEdgeDTO, 'ground_distance'>