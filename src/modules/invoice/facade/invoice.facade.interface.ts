export interface FindInvoiceFacadeUseCaseInputDTO {
    id: string;
}

export interface FindInvoiceFacadeUseCaseOutputDTO {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
    createdAt: Date;
}

export interface GenerateInvoiceFacadeUseCaseInputDto {
    id?: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      price: number;
    }[];
  }
  
  export interface GenerateInvoiceFacadeUseCaseOutputDto {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
      id: string;
      name: string;
      price: number;
    }[];
    total: number;
  }

  export default interface InvoiceFacadeInterface {
    find(input: FindInvoiceFacadeUseCaseInputDTO): Promise<FindInvoiceFacadeUseCaseOutputDTO>

    generate(input: GenerateInvoiceFacadeUseCaseInputDto) : Promise<GenerateInvoiceFacadeUseCaseOutputDto>
  }