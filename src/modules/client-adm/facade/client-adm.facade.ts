import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, AddClientFacadeOutputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface";


type ClientAdmFacadeProps = {
    addUseCase: UseCaseInterface;
    findUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    private _addUseCase : UseCaseInterface;
    private _findUseCase : UseCaseInterface;

    constructor(props: ClientAdmFacadeProps) {
        this._addUseCase = props.addUseCase;
        this._findUseCase = props.findUseCase;
    }

    async add(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto> {
        return await this._addUseCase.execute(input);
    }
    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUseCase.execute(input);
    }

}