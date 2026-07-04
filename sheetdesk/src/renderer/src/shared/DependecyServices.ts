import { Container } from "inversify";

import AlunoController from "../presentation/controllers/AlunoController";

import IAlunoRepository from "@renderer/domain/repositories/IAlunoRepository";
import AlunoRepository from "@renderer/infrastructure/AlunoRepository";

import LerAlunoUseCase from "@renderer/aplication/UseCase/AlunoReadUseCase";
import AlunoUseCase from "@renderer/aplication/UseCase/AlunoUseCase";
import Types from "./Types";


const DependencyInjection = new Container();

DependencyInjection.bind<LerAlunoUseCase>(LerAlunoUseCase).toSelf();
DependencyInjection.bind<AlunoUseCase>(AlunoUseCase).toSelf();
DependencyInjection.bind<IAlunoRepository>(Types.IAlunoRepository).to(AlunoRepository);

const formatDate = (date: string) => {
    const [YYYY, MM, dd] = date.split("-")
    
    const foramtedDate = `${dd}/${MM}/${YYYY}`
    return foramtedDate
}


export {DependencyInjection, formatDate}