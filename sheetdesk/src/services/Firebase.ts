import { FirebaseApp, initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Firestore, doc, getDoc, getDocs, where, WhereFilterOp } from "firebase/firestore";



class Firebase {
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

        Firebase.app = initializeApp(firebaseConfig);

        this.db = getFirestore(Firebase.app)
    }

    readCollection = async (filtro: string) =>  {
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
        } catch (e) {
            console.error("Erro ao buscar:", e)
        }

    }

    addAluno = async () => {
        try {
            
        } catch (e) {

        }
    }

}


export default Firebase