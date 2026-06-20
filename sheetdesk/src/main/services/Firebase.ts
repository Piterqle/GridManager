import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Firestore, doc, getDoc, getDocs, where, WhereFilterOp, setDoc, runTransaction } from "firebase/firestore";
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

    readAluno = async (filtro: string) =>  {
        try {
            if (filtro) {
                const [col, operadores, value] = filtro.split(" ");

                const snapShot = await getDocs(collection(this.db, "Alunos"));

                const operadoresFirebase = operadores === "="? "==" : operadores;
                return snapShot.docs.map(doc => {
                    id : doc.id,
                    doc.data()
                }, where(col, operadoresFirebase as WhereFilterOp, value))
            
                
            }
            return;
        } catch (e) {
            console.error("Erro ao buscar:", e)
            return [];
        }

    }

    addAluno = async (aluno: Aluno) => {
        try {
            const contadorRef = doc(this.db, "Contador", "Alunos")

            let idNovo = 1
            await runTransaction(this.db, async (transanction) => {

                const contadorSnap = await transanction.get(contadorRef)


                if(contadorSnap.exists()) {
                    idNovo = contadorSnap.data().ID + 1
                }

                transanction.set(contadorRef, {
                    ID: idNovo
                })
            })
            const alunoRef = doc(this.db, "Alunos", idNovo.toString())

            await runTransaction(this.db, async (transaction) => {
                
                transaction.set(alunoRef, 
                {
                Nome: aluno.nome,
                Modalidade: aluno.modalidade,
                DataDaProcura: aluno.data_procura,
                DataDaExperiencia: aluno.data_experiencia,
                Semana: aluno.semana,
                Horario: aluno.horario,
                Contato: aluno.contato,
                Status: aluno.status
            })})
            return;
        } catch (e) {
            return;
        }
    }

}


