function Die(props)
{
    const style={backgroundColor:props.held ? "#59E391" :null}
    
    return <button className="die" style={style} onClick={() => props.hold(props.id)}>{props.value} </button>
}
export default Die 