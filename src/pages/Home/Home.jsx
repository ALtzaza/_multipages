import "./Home.css";

function Home() {
    return ( 
        <div className="home-container">
            <h1 className="title-name">INTRODUCE YOUR SELF</h1>
            <img src="ME.png" className="Profile" />
            <p className="home-introduce">
                Hello my name is <b>Achirayu Nualsakuwat</b>. I was born on <b>December 4 2004</b>.<br/>
                and <b>I am 19 years old.</b> In my free time, I enjoy playing video games.<br/> I have simple experience working with HTML, JavaScript, and CSS.
            </p>
        </div>
     );
}

export default Home;