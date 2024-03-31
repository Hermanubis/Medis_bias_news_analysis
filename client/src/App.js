import './App.css';
import { useEffect, useState, useRef } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ArticleList from './components/ArticleList';
import Summary from './components/Summary';
import 'react-tabs/style/react-tabs.css';
import logo from './assets/shovel.png'
import handleNewsJSON from './scripts/handleNewsJSON';
import getData from './scripts/getData';

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


function App() {
  const current = new Date();
  const date = `${monthNames[current.getMonth()]} ${current.getDate()}, ${1900 + current.getYear()}`;
  const [newsJson, setJson] = useState(null)
  const [highlightedText, setHighlightedText] = useState("trump")
  const [filter, setFilter] = useState('relevancy')
  const optionsRef = useRef(null);

  useEffect(() => {
   // Listen you CRX event
  document.addEventListener('keywords', function (event) {
    console.log(event);
    var keyword = event.detail;
    console.log(keyword);
    setHighlightedText(keyword);
  });

    if (highlightedText && filter) {
      setFilter(optionsRef?.current.value);
      getData(highlightedText, filter).then(response=> {
        setJson(response);
        console.log(response)
      }
      );
    }
  });

  let {leftLeaningArticles, 
    usedLeftLeaningSources, 
    centerLeaningArticles, 
    usedCenterLeaningSources,
    rightLeaningArticles, 
    usedRightLeaningSources} = handleNewsJSON(newsJson);


  return (
    <div className="container">
      <div className = "header">
        <div className = 'logo-container'>
          <div className = 'inline'>
            <img src = {logo} className = 'logo'/>
          </div>
          <div className = 'inline'>
            <h1 className='title'>Shovel News</h1>
          </div>
        </div>
        <h1 className='title grey'>{date}</h1>

       <select id="options" ref={optionsRef}>
        <option value="relevancy">Relevancy</option>
        <option value="popularity">Popularity</option>
        <option value="publishedAt">Recency</option>
      </select>
      </div>
        <Tabs>
          <TabList>
            <Tab style = {{fontSize: 10, fontFamily: 'Inter'}}>Left Leaning</Tab>
            <Tab style = {{fontSize: 10, fontFamily: 'Inter'}}>Center Leaning</Tab>
            <Tab style = {{fontSize: 10, fontFamily: 'Inter'}}>Right Leaning</Tab>
            <Tab style = {{fontSize: 10, fontFamily: 'Inter'}}>Summary</Tab>
          </TabList>
          <TabPanel>
            <ArticleList articles={leftLeaningArticles}/>
          </TabPanel>
          <TabPanel>
            <ArticleList articles={centerLeaningArticles}/>
          </TabPanel>
          <TabPanel>
            <ArticleList articles={rightLeaningArticles}/>
          </TabPanel>
          <TabPanel>
            <Summary 
            leftdata = {usedLeftLeaningSources} 
            centerdata = {usedCenterLeaningSources} 
            rightdata = {usedRightLeaningSources}
            numleft = {leftLeaningArticles.length}
            numcenter = {centerLeaningArticles.length}
            numright = {rightLeaningArticles.length}
            />
          </TabPanel>
        </Tabs>
    </div>
  );
}

export default App;
