import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client.gateway";
import {FindClientInputDto, FindClientOutputDto} from "./find-client.usecase.dto";

export default class FindClientUseCase implements UseCaseInterface {
    private _gateway: ClientGateway;

    constructor(gateway: ClientGateway) {
        this._gateway = gateway;
    }
    
    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {

        const client = await this._gateway.find(input.id);

        return {
            id: client.id.id,
            city: client.address.city,
            complement: client.address.complement,
            number: client.address.number,
            state: client.address.state,
            document: client.document,
            street: client.address.street,
            zipCode: client.address.zipCode,
            email: client.email,
            name: client.name,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }
    }
    
}