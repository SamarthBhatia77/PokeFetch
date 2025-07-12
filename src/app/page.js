'use client';
import Image from "next/image";
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import React,{useState,useEffect} from 'react'
export default function Home() {
  
  const [pokemonName,setPokemonName]=useState("pikachu");
  const [pokemonPic,setPokemonPic]=useState("");
  const [name,setName]=useState("");
  const [id,setId]=useState(0);
  const [types,setTypes]=useState([]);

  const [hp,setHp]=useState(0);
  const [attack,setAttack]=useState(0);
  const [defence,setDefence]=useState(0);
  const [spAttack,setSpAttack]=useState(0);
  const [spDefence,setSpDefence]=useState(0);
  const [speed,setSpeed]=useState(0);
  const [weight,setWeight]=useState(0);

  const [cry,setCry]=useState("");

  async function fetchData() {
    try {
      const response=await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      if(!response.ok) {
        throw new Error("Could not fetch pokemon data");
      }
      const data = await response.json();
      console.log(data);
      const pokemonSprite=data.sprites.front_default;
      setPokemonPic(pokemonSprite);
      const pkmnName=data.name;
      setName(pkmnName);
      const pkmnID=data.id;
      setId(pkmnID);
      const pkmnTypes = data.types.map(t => t.type.name);
      setTypes(pkmnTypes);
      const hp=data.stats[0].base_stat;
      setHp(hp);
      const attack=data.stats[1].base_stat;
      setAttack(attack);
      const defence=data.stats[2].base_stat;
      setDefence(defence);
      const spattack=data.stats[3].base_stat;
      setSpAttack(spattack);
      const spdefence=data.stats[4].base_stat;
      setSpDefence(spdefence);
      const speed=data.stats[5].base_stat;
      setSpeed(speed);
      const pkmnWeight=data.weight;
      setWeight(pkmnWeight);

      const cryUrl=data.cries.latest;
      setCry(cryUrl);
    }
    catch(error) {
      console.error(error);
    }
  }
  useEffect(()=> {
   fetchData();
  },[])
  return (
    <div>
      <div className="flex flex-col items-center align-center justify-center">
        <img src="/pokefetch.png" className="lg:w-90 mt-5"></img>
        <p className="lg:text-[16px] lg:m-0 lg:p-0 m-3 font-mono text-white">Enter pokemon name to fetch data!</p>
      </div>
      <div className="flex items-center justify-center">
      <div className="lg:mt-9 lg:mr-0 lg:p-0 mr-2 border border-white rounded inline-block w-90 h-162 mt-9 mb-8 bg-white"> 
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="flex">
              <input type="text" placeholder="Enter Pokemon Name" value={pokemonName} className="w-[190px] mr-2 border border-[#B2B2B2] rounded bg-[#696969] text-white px-2 focus:border-[#30BBE8] focus:border-[2px] focus:outline-none" id="pokemonName" onChange={(e)=>{setPokemonName(e.target.value)}}/>
              <button onClick={fetchData} className="bg-[#30BBE8] text-white rounded py-1 px-3 cursor-pointer hover:bg-[#1995BC] transition 0.3s ease-in-out">Fetch Pokemon</button>
          </div>
            <img src={pokemonPic} className="w-60" id="pokemonSprite"></img>
            <div className="flex gap-0 items-center align-center justify-center ">
              <p id="pkmnName" className="text-[40px]">{name}</p>
              <button
                onClick={() => {
                  const audio = new Audio(cry);
                  audio.play();
                }}
              className=" bg-[] px-2 py-1 rounded cursor-pointer"
              aria-label="Play Pokemon Cry"
              >
                <MicrophoneIcon className="w-7"/>
              </button>
            </div>
            {id==0 ? null :
              (<p id="pkmnid" className="text-[#696969]">ID: {id}</p>) }
            <p className="text-[#696969]"><b>Weight :</b> {weight} kg</p>
            <div className="flex gap-1">
              <p className="text-[#696969]"><b>Type :  </b> </p>
              {types.map((t, index) => (
              <p key={index} className="ml-1 text-[#696969]">
                 {t}
              </p>
                  ))}
            </div>
            <p className="text-[25px] my-3 font-mono underline font-bold">Base Stats</p>
            <div className="text-[#696969] flex flex-col items-center align-center">
              <p><b>HP :  </b>{hp}</p>
              <p><b>ATTACK :  </b>{attack}</p>
              <p><b>DEFENCE :  </b>{defence}</p>
              <p><b>SP. ATTACK :  </b>{spAttack}</p>
              <p><b>SP. DEFENSE :  </b>{spDefence}</p>
              <p><b>SPEED :  </b>{speed}</p>
            </div>
        </div>
      </div>
    </div>
    <p className="flex items-center justify-center align-center mb-4 text-white">&copy; 2025 PokeFetch! | Samarth Bhatia</p>
    </div>
  );
}
