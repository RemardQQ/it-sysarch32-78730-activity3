import { useState, useEffect } from 'react'
import Pokemon from './Pokemon'

export default function Pokedex(){
    const [pokemonList, setPokemonList] = useState([])
    const [language, setLanguage] = useState('english')

    useEffect(()=>{
        fetch('https://us-central1-it-sysarch32.cloudfunctions.net/pokemon').then(res=>{
            res.json().then(data=>{
                const modifiedData = []

                data.forEach(pokemon =>
                    modifiedData.push({...pokemon, pokeStats: pokemon.base})      
                );

                setPokemonList(modifiedData)
            })
        })

    }, [])

    return (
        <main>
            <div className="change_language">
                <button onClick={() => setLanguage('ENGLISH')}>English</button>
                <button onClick={() => setLanguage('JAPANESE')}>Japanese</button>
                <button onClick={() => setLanguage('CHINESE')}>Chinese</button>
                <button onClick={() => setLanguage('FRENCH')}>French</button>
            </div>

            <ul className="pokedex">
                {pokemonList.map(pokemon => {
                    const updatedPokemon = {...pokemon, pokeName: pokemon.name[language]}
                    return <Pokemon key={pokemon.id} {...updatedPokemon}/>
                })}
            </ul>
        </main>
    )
}
