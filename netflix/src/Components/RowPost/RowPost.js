import React, { useEffect, useState } from 'react'
import {imageUrl,API_KEY} from '../../constants/constants'
import YouTube from 'react-youtube'
import axios from '../../axios'
import './RowPost.css'
function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [urlId, setUrlId] = useState('')
    useEffect(() => {
      axios.get(props.url).then(response=>{
        console.log(response.data);
        setMovies(response.data.results)
      }).catch(err=>{
        alert('Network Error')
      })
    }, [])
    const opts = {
        height: '500px',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
    const handleMovie = (id)=>{
        console.log(id);
        axios.get(`movie/${id}/videos?language=en-US&api_key=${API_KEY}`).then(response=>{
          if(response.data.results!==0){
            setUrlId(response.data.results[0])
            console.log(response.data.results[0].key)
          }
          else{
            console.log('Array empty')
          }
        })
    }
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj)=>
                    <img onClick={()=>handleMovie(obj.id)} className={props.isSmall? 'smallPoster' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} alt='poster' />                
                )}                
            </div>
           { urlId && <YouTube videoId={urlId.key} opts={opts}/>}
        </div>
    )
}

export default RowPost