import {Box, Button, InputLabel, TextField} from "@mui/material";
import {useState} from "react";
import {db} from '../Firebase';
import {addDoc, collection, getDocs, query, where} from "firebase/firestore";


function Main() {

    const defaultCollection = 'default';


    const [collectionUsed, setCollectionUsed] = useState('');
    const [firstPropName, setFirstPropName] = useState();
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

        if (firstPropValue && firstPropName) {
            const date = new Date(firstPropValue);
            if (date) {
                newObj[firstPropName] = date;
            } else {
                newObj[firstPropName] = firstPropValue;
            }
        }

        if (secondPropValue && secondPropName) {
            const integerToSend = parseInt(secondPropValue);
            if (isNaN(integerToSend)) {
                newObj[secondPropName] = secondPropValue;
            } else {
                newObj[secondPropName] = integerToSend;

            }
        }

        if (thirdPropValue && thirdPropName) {
            newObj[thirdPropName] = thirdPropValue;
        }

        if (firstPropValue || secondPropValue || thirdPropValue) {

            newObj["createdAt"] = new Date();
            fetch(addDoc(collection(db, collectionToFeed), newObj)).then((response) => console.log("Envoyé vers Firestore")).catch((error) => console.log(error.message));
        }
    }

    async function handleSubmitSearch(ev) {
        ev.preventDefault();
        let collectionToSearch = defaultCollection;
        if (searchCollection) {
            collectionToSearch = searchCollection;
        }
        if (searchProperty && searchValue) {
            const q = query(collection(db, collectionToSearch), where(searchProperty, "==", searchValue));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        }
    }

    return (

        <Box sx={{bgcolor: '#cfe8fc', height: '100vh', p: 2}}>
            <Box sx={{p: 2}}>

                <InputLabel>Collection où ajouter le document</InputLabel>
                <TextField sx={{m: 1}} value={collectionUsed} onChange={(event) => setCollectionUsed(event.target.value)}
                           id="outlined-basic"
                           label="Nom collection" variant="outlined"/>
            </Box>
            <Box sx={{p: 2}}>
                <InputLabel>Propriété 1 du document  (peut-être une date au format YYYY-MM-DD)</InputLabel>
                <TextField sx={{m: 1}} value={firstPropName} onChange={(event) => setFirstPropName(event.target.value)}
                           id="outlined-basic"
                           label="Nom Propriété 1" variant="outlined"/>

                <TextField sx={{m: 1}} value={firstPropValue} onChange={(event) => setFirstPropValue(event.target.value)}
                           id="outlined-basic"
                           label="Valeur propriété 1" variant="outlined"/>
            </Box>
            <Box sx={{p: 2}}>

                <InputLabel>Propriété 2 du document (peut être un nombre entier)</InputLabel>
                <TextField sx={{m: 1}} value={secondPropName} onChange={(event) => setSecondPropName(event.target.value)}
                           id="outlined-basic"
                           label="Nom propriété 2" variant="outlined"/>

                <TextField sx={{m: 1}} value={secondPropValue} onChange={(event) => setSecondPropValue(event.target.value)}
                           id="outlined-basic"
                           label="Valeur propriété 2" variant="outlined"/>
            </Box>
            <Box sx={{p: 2}}>

                <InputLabel>Propriété 3 du document</InputLabel>
                <TextField sx={{m: 1}} value={thirdPropName} onChange={(event) => setThirdPropName(event.target.value)}
                           id="outlined-basic"
                           label="Nom propriété 3" variant="outlined"/>

                <TextField sx={{m: 1}} value={thirdPropValue} onChange={(event) => setThirdPropValue(event.target.value)}
                           id="outlined-basic"
                           label="Valeur propriété 3" variant="outlined"/>
            </Box>
            <Box sx={{p: 2, gap:2}}>

                <Button
                    onClick={handleSubmitUser} variant="contained">Ajouter entrée</Button>
            </Box>
            <Box sx={{p: 2}}>

                <InputLabel>Collection à chercher</InputLabel>
                <TextField sx={{m: 1}} value={searchCollection} onChange={(event) => setSearchCollection(event.target.value)}
                           id="outlined-basic"
                           label="Collection à chercher" variant="outlined"/>

                <Box sx={{p: 2}}>
                    <InputLabel>Propriété</InputLabel>
                    <TextField sx={{m: 1}} value={searchProperty} onChange={(event) => setSearchProperty(event.target.value)}
                               id="outlined-basic"
                               label="Propriété à chercher" variant="outlined"/>
                    <TextField sx={{m: 1}} value={searchValue} onChange={(event) => setSearchValue(event.target.value)}
                               id="outlined-basic"
                               label="Valeur de la propriété" variant="outlined"/>
                </Box>

                <Box sx={{p: 2}}>
                    <Button
                        onClick={handleSubmitSearch} variant="contained">Recherche</Button>
                </Box>
            </Box>

        </Box>

    );

}

export default Main;