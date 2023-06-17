import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/client.entity";
import Address from "../../domain/value-object/address.value-object";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";


export default class AddClientUseCase implements UseCaseInterface {
    private _gateway: ClientGateway;

    constructor(gateway: ClientGateway) {
        this._gateway = gateway;
    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {
        const clientProps = {
            id: new Id(input.id) || new Id(),
            address: new Address({
                street: input.street,
                number: input.number,
                complement: input.complement,
                city: input.city,
                state: input.state,
                zipCode: input.zipCode,
            }),
            document: input.document,
            email: input.email,
            name: input.name
        }

        const client = new Client(clientProps)

        await this._gateway.add(client)

        return {
            id: client.id.id,
            street: client.address.street,
            number: client.address.number,
            document: client.document,
            complement: client.address.complement,
            city: client.address.city,
            state: client.address.state,
            zipCode: client.address.zipCode,
            createdAt: client.createdAt,
            email: client.email,
            name: client.name,
            updatedAt: client.updatedAt
        }
    }

}