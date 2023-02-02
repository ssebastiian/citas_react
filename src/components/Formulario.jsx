import {useState , useEffect} from "react"
import Error from "./Error";

export const Formulario = ({pacientes,setPacientes,paciente,setPaciente}) => {

    const[nombre,setNombre] = useState('');
    const[propietario,setPropietario] = useState('');
    const[email,setEmail] = useState('');
    const[fecha,setFecha] = useState('');
    const[sintomas,setSintomas] = useState('');

    useEffect( ()=>{
      if(Object.keys(paciente).length > 0){
        setNombre(paciente.nombre)
        setPropietario(paciente.propietario)
        setEmail(paciente.email)
        setFecha(paciente.fecha)
        setSintomas(paciente.sintomas)
      }
      
    },[paciente])
    
    const generarid= () =>{
      const random = Math.random().toString(36).substring(2);
      const fecha = Date.now().toString(36);

      return random + fecha;
    }

    const[error,setError] = useState(false);

    const HandleSubmit = (e) =>{
      e.preventDefault();

      if([nombre,propietario,email,fecha,sintomas].includes('')){
        setError(true);
        return;
      }
      setError(false);

      const ObjetoPaciente = {
        nombre,
        propietario,
        email,
        fecha,
        sintomas
      }
      if(paciente.id){
        //Editado Registro
        ObjetoPaciente.id = paciente.id
        const pacienteActualizado = pacientes.map( pacienteState => pacienteState.id === paciente.id ? ObjetoPaciente : pacienteState)

        setPacientes(pacienteActualizado)
        setPaciente({})

      }else{
        //neuvo registro
        ObjetoPaciente.id = generarid();
        //metodo inmutable
        setPacientes([...pacientes, ObjetoPaciente])
      }
      // limpiar los campos
      setNombre('')
      setPropietario('')
      setEmail('')
      setFecha('')
      setSintomas('')
    }

  return (
    <div className="md:w-1/2 lg:w-3/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className=" text-lg mt-5 text-center mb-10">
        añade pacientes y {' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form onSubmit={HandleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {error && <Error><p>Todos los campos son requeridos</p></Error>}
        <div className="mb-5">
            <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
            <input  id="mascota" type="text" placeholder="Nombre de la mascota" className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md" 
            value={nombre}
            onChange={ (e) => setNombre(e.target.value)}/>
        </div>
        <div className="mb-5">
            <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
            <input  id="propietario" type="text" placeholder="Nombre Del Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md"
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value)}/>
        </div>
        <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
            <input  id="email" type="email" placeholder="Email Del Propietario" className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}/>
        </div>
        <div className="mb-5">
            <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
            <input  id="alta" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-500 rounded-md"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value)}/>
        </div>
        <div className="mb-5">
            <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
            <textarea id="sintomas" className=" border-2 w-full p-2 mt-2 placeholder-gray-800 rounded-md" placeholder="Describe los sintomas"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value)}/>
        </div>
        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-800 cursor-pointer" 
        value={paciente.id ? "Editar Paciente":"Agregar Paciente"}/>
      </form>
    </div>
  )
}
