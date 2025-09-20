import React from 'react'
import {Link , useNavigate} from 'react-router-dom'

function home() {
    const [repo, setRepo] = useState(second)
    const navigate= useNavigate();

    const handlesubmit= (e)=>{
        e.preventDefault();
        if(repo.trim()){
            navigate(`/repo/${repo.trim()}`);
        }
    };
  return (
    <div>
        <div>
            <h3>GitHub Repo Issue Viewer</h3>
            <form onSubmit={handlesubmit}>
                <input type="text"
                value={repo}
                onChange={(e)=> setRepo(e.target.value)}
                placeholder='owner/repo (eg. facebook/react)' />
            <button type='submit'>View Issue</button>
            </form>
        </div>
        
    </div>
  )
}

export default home
