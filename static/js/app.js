(async function load(){
	
	class character{
		constructor({name, bloodStatus, role, school, species}){
			this.name=name;
			this.bloodStatus = bloodStatus;
			this.role=role;
			this.school=school;
			this.species=species;
			this.$character= document.querySelector('.description')
			this.render()
		}
		personajeTemplate(){
			return(`
				<p>Nombre: "${this.name}"</p>
				<p>Tipo de sangre: "${this.bloodStatus}" </p>
				<p>Rol: "${this.role}" </p>
				<p>Escuela: "${this.school}" </p>
				<p>Especie: "${this.species}"</p>
			`)
		}
		render(){
			this.$character.innerHTML=this.personajeTemplate()
		}
	}

	const API_KEY = '$2a$10$mGlXelDiRDjXjRSJpuAZEuCkCGbOZQVtRPOY4Wh.pTkXAJGpJ6aey';
	let current = 0
	async function getData(url){
		const response=await fetch(url);
		const data= await response.json();
		return data;
	}

	
	const personaje = await getData(`https://www.potterapi.com/v1/characters?key=${API_KEY}`);
	console.log(personaje);
	
	const $next = document.querySelector('.next');
	const $previous = document.querySelector('.previous');
	
	$previous.addEventListener('click',async ()=>{
    const characterData=await personaje[--current]
    new character(characterData)
	})

	$next.addEventListener('click',async ()=>{
    const characterData=await personaje[++current]
    new character(characterData)
	})

	async function initApp(current){
		const characterData=await personaje[current]
		console.log(characterData)
    new character(characterData)
	}
	initApp(current)

})()