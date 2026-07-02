import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Firestore, doc, getDoc, getDocs, where, WhereFilterOp, setDoc, runTransaction, query } from "firebase/firestore";
import Aluno from "../../renderer/src/domain/entidades/alunoClass"



export class FirebaseService {
    private static app: FirebaseApp | null = null

    private db: Firestore


    constructor() {
        const firebaseConfig = {
            apiKey: "AIzaSyCptjbqNVSuOuR07xQ03GFHTG3pd6KpVfM",
            authDomain: "alunosexperimentais.firebaseapp.com",
            projectId: "alunosexperimentais",
            storageBucket: "alunosexperimentais.firebasestorage.app",
            messagingSenderId: "1030801703031",
            appId: "1:1030801703031:web:eee48d1202919b23d44672",
            measurementId: "G-DMVFRSXHXH"
        };

        FirebaseService.app = initializeApp(firebaseConfig);

        this.db = getFirestore(FirebaseService.app)
    }

    readAluno = async (filtro: string = "") =>  {
        try {
            const snapShot = await getDocs(collection(this.db, "Alunos"));
            if (filtro.length > 0) {
                const [col, operadores, value] = filtro.split(" ");
                const operadoresFirebase = operadores === "="? "==" : operadores;
                

                const res = await snapShot.docs.map(doc => ({
                    id : doc.id,
                    data: doc.data()
                }), where(col, operadoresFirebase as WhereFilterOp, value))

                return res;
                
            }

            const res = await snapShot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }));
            
            console.log(res)
            return res;
            
        } catch (e) {
            console.error("Erro ao buscar:", e)
            return {};
        }

    }

    addAluno = async (aluno: Aluno) => {
        try {
            const contadorRef = doc(this.db, "Contador", "Alunos")

            let idNovo = 1
            await runTransaction(this.db, async (transanction) => {

                const contadorSnap = await transanction.get(contadorRef)


                if(contadorSnap.exists()) {
                    idNovo = parseInt(contadorSnap.data().ID) + 1
                }

                transanction.set(contadorRef, {
                    ID: idNovo
                })
            })
            const alunoRef = doc(this.db, "Alunos", idNovo.toString())
            await setDoc(alunoRef, {
                Nome: aluno.nome || "",
                Modalidade: aluno.modalidade || "",
                DataDaProcura: aluno.data_procura || "",
                DataDaExperiencia: aluno.data_experiencia || "",
                Semana: aluno.semana || "",
                Horario: aluno.horario || "",
                Contato: aluno.contato || "",
                Status: aluno.status || ""
            })
            console.log("Aluno adicionado com sucesso!")
            return;
        } catch (e) {
            console.error("Erro ao adicionar aluno:", e)
            return;
        }
    }

}


