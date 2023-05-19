import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {

  const [tweets, settweets] = useState([])
  const [searchResults , setSearchResults] = useState([])
  const [searchKeyword , setSearchKeyword] = useState("")
  const [tweet, settweet] = useState("") 

  async function getTweets() {
    let data = await fetch("https://apex.oracle.com/pls/apex/sowmith_workspace/tweets/get")
    let convertedData = await data.json()

    console.log(convertedData)
    settweets(convertedData.items)
  }

  async function postTweet() {
    settweet("")
    let date =new Date()
 await fetch(`https://apex.oracle.com/pls/apex/sowmith_workspace/tweets/post?tweets=${tweet}&datetime=${date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear()}`,{method:"POST"})
 getTweets()
  }
  async function likes(){ 
  }

  async function searchTweet(){
    console.log("searching....")
    let data = await fetch(`https://apex.oracle.com/pls/apex/sowmith_workspace/tweets/search?keyword=${searchKeyword}`)
    let convertedData = await data.json()
    setSearchResults(convertedData.items)
  }
  
  useEffect(() => {
    getTweets()
  }, [])
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <i className="bi bi-twitter text-primary h1"></i>
        </div>
        {/* home */}
        <div className="col-6">
          <div className="row">
            <div className="col">
              <h3>Home</h3>
              <hr />
            </div>

          </div>
          <div className="row">
            <div className="col-2 text-center">
              <i className="bi bi-person-circle h1 "></i>
            </div>
            <div className="col">
              <input value={tweet} onChange={(event)=>{
                settweet(event.target.value)
              }} type="text" placeholder="What's happening?" className="form-control" />
              <button onClick={postTweet} className={`btn btn-primary float-end my-2 ${tweet===""?"disabled":""}`}>tweet</button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {
                tweets.map((Element) => {
                  return <div className="rounded  border border-3 p-2 my-2">
                    <p> {Element.datetime}</p>
                    <h3> {Element.tweets}</h3>
                    <div className=' text-end'>
                        <i onClick={()=>{ 
                          fetch(`https://apex.oracle.com/pls/apex/sowmith_workspace/tweets/likes?tweet=${Element.tweets}`,{method:"POST"}).then( getTweets())}
                     } class="bi bi-heart"></i>
                        <span className='mx-2 '>{Element.likes}</span>
                    </div>

                  </div>
                })
              }
            </div>
          </div>
        </div>
        {/* search */}
        <div className="col-3 ">
          <div className="row">
            <div className="col">
          <input value = {searchKeyword} onChange={(e)=>{
            setSearchKeyword(e.target.value)
            console.log("search")
            searchTweet()
            }} type="text" placeholder='Search Tweets' className='form-control' />
            </div>
          </div>
          <div className="row">
            <div className="col">
              {
                searchResults.map((results) => {
                  return <div className="rounded  border border-3 p-2 my-2">
                  <p> {results.datetime}</p>
                  <h3> {results.tweets}</h3>
                  <div className=' text-end'>
                      <i onClick={()=>{ 
                        fetch(`https://apex.oracle.com/pls/apex/sowmith_workspace/tweets/likes?tweet=${results.tweets}`,{method:"POST"}).then( getTweets())}
                   } class="bi bi-heart"></i>
                      <span className='mx-2 '>{results.likes}</span>
                  </div>

                </div>
                })
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
