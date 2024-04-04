import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import {db} from '../Firebase';
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";


function Main() {

    const defaultCollection = 'default';


    const [collectionUsed, setCollectionUsed] = useState('');
    const [firstPropName, setFirstPropName] = useState('');
    const [firstPropValue, setFirstPropValue] = useState('');
    const [secondPropName, setSecondPropName] = useState('');
    const [secondPropValue, setSecondPropValue] = useState('');
    const [thirdPropName, setThirdPropName] = useState('');
    const [thirdPropValue, setThirdPropValue] = useState('');
    const [searchCollection, setSearchCollection] = useState('');
    const [searchProperty, setSearchProperty] = useState('');
    const [searchValue, setSearchValue] = useState('');

    function handleSubmitUser(ev) {
        ev.preventDefault();
        const newObj = {};
        let collectionToFeed = defaultCollection;

        if (collectionUsed) {
            collectionToFeed = collectionUsed;
        }

        if (firstPropValue) {
            newObj[firstPropName] = firstPropValue;
        }

        if (secondPropValue) {
            newObj[secondPropName] = secondPropValue;
        }

        if (thirdPropValue) {
            newObj[thirdPropName] = thirdPropValue;
        }

        if (firstPropValue || secondPropValue || thirdPropValue) {
            fetch(addDoc(collection(db, collectionToFeed), newObj)).then((response) => console.log("Envoyé vers Firestore")).catch((error) => console.log(error.message));
        }
    }

    async function handleSubmitSearch(ev) {
        ev.preventDefault();
        let collectionToSearch = defaultCollection;
        if (searchCollection) {
            collectionToSearch = searchCollection;
        }
        const q = query(collection(db, collectionToSearch), where(searchProperty, "==", searchValue));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    }

    return (

        <Box sx={{bgcolor: '#cfe8fc', height: '100vh', p: 2}}>
            <Box sx={{p: 2}}>
                <TextField value={collectionUsed} onChange={(event) => setCollectionUsed(event.target.value)}
                           id="outlined-basic"
                           label="Nom collection" variant="outlined"/>
            </Box>
            <Box sx={{p: 2}}>
                <TextField value={firstPropName} onChange={(event) => setFirstPropName(event.target.value)}
                           id="outlined-basic"
                           label="Nom Propriété 1" variant="outlined"/>

                <TextField value={firstPropValue} onChange={(event) => setFirstPropValue(event.target.value)}
                           id="outlined-basic"
                           label="Valeur propriété 1" variant="outlined"/>
            </Box>
            <Box sx={{p: 2}}>

                <TextField value={secondPropName} onChange={(event) => setSecondPropName(event.target.value)}
                           id="outlined-basic"
                           label="Nom propriété 2" variant="outlined"/>

                <TextField value={secondPropValue} onChange={(event) => setSecondPropValue(event.target.value)}
                           id="outlined-basic"
                           label="Valeur propriété 2" variant="outlined"/>
            </Box>
            <Box sx={{p: 2}}>

                <TextField value={thirdPropName} onChange={(event) => setThirdPropName(event.target.value)}
                           id="outlined-basic"
                           label="Nom" variant="outlined"/>

                <TextField value={thirdPropValue} onChange={(event) => setThirdPropValue(event.target.value)}
                           id="outlined-basic"
                           label="Prénom" variant="outlined"/>
            </Box>
            <Box sx={{p: 2}}>

                <Button
                    onClick={handleSubmitUser} variant="contained">Ajouter entrée</Button>
            </Box>
            <Box sx={{p: 2}}>
                <Box sx={{p: 2}}>
                    <TextField value={searchProperty} onChange={(event) => setSearchProperty(event.target.value)}
                               id="outlined-basic"
                               label="Champ à chercher" variant="outlined"/>
                    <TextField value={searchValue} onChange={(event) => setSearchValue(event.target.value)}
                               id="outlined-basic"
                               label="Valeur" variant="outlined"/>
                </Box>
                <TextField value={searchCollection} onChange={(event) => setSearchCollection(event.target.value)}
                           id="outlined-basic"
                           label="Collection à chercher" variant="outlined"/>

                <Box sx={{p: 2}}>
                    <Button
                        onClick={handleSubmitSearch} variant="contained">Recherche</Button>
                </Box>
            </Box>

        </Box>

    );

}

export default Main;