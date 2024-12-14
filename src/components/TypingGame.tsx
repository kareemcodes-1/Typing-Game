import React, { ChangeEvent, useEffect, useRef, useState } from 'react'

const TypingGame = () => {

    const data = 'The bright morning sun rose over the tranquil ocean, painting the sky in hues of orange and pink, as waves gently kissed the shore, whispering secrets of the deep, endless horizon The bright morning sun rose over the tranquil ocean, painting the sky in hues of orange and pink, as waves gently kissed the shore, whispering secrets of the deep, endless horizon The bright morning sun rose over the tranquil ocean, painting the sky in hues of orange and pink, as waves gently kissed the shore, whispering secrets of the deep, endless horizon';
    

    const [inputValue, setInputValue] = useState<string[]>(data.split(''));
    const [active, setActive] = useState<boolean[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [endGame, setEndGame] = useState<boolean>(false);

    const [timer, setTimer] = useState<number>(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if(prevTimer <= 1){
                    clearInterval(interval);
                    setEndGame(true);
                    return 0;
                }else{
                    return prevTimer - 1;
                }
            })
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, []);


    function handleChange(e: ChangeEvent<HTMLTextAreaElement>){
        const typedChar = e.target.value; 
        e.target.value = '';

        setCurrentIndex((currentIndex) => currentIndex + 1);

        if(typedChar === inputValue[currentIndex]){
            const value = true;
            setActive([...active, value]);
            setScore((score) => score += 100);
        }else{
            const value = false;
            setActive([...active, value]);
        }
    }

    console.log(active);





  return (
    <div className='flex items-start justify-center flex-col'>
        {!endGame && <h2 className='text-[2.5rem] text-white'>{timer}</h2>}
        <div className={`flex items-center justify-center ${endGame ? 'h-[100vh]' : 'h-[60vh]'}  w-full`}>
            {endGame ? 
            <>
           {
            score <= 500 ? 
            <div>
                <h1 className='text-[3rem] text-white text-center mb-[1rem]'>Score: {score}</h1>
                <img src="https://media0.giphy.com/media/ISOckXUybVfQ4/200.webp?cid=790b7611jn7kqsdmivjmxt6qekspxd9ntfyugl66w0l8equ5&ep=v1_gifs_search&rid=200.webp&ct=g" className='w-[30rem] h-[20rem]' alt="" />
            </div> : 

            <div>
                <h1 className='text-[3rem] text-white text-center mb-[1rem]'>Score: {score}</h1>
                <img src="https://media0.giphy.com/media/BPJmthQ3YRwD6QqcVD/200.webp?cid=790b7611x0rep89ygvc1r89mb91338h6o1puoofkesdsc7o1&ep=v1_gifs_trending&rid=200.webp&ct=g" className='w-[30rem] h-[20rem]' alt="" />
            </div>
            }
            </>
             : <div className="h-[20vh] w-[70%] relative" id="scroll-container">
             <div
               className="absolute top-0 left-0 w-full h-full overflow-y-scroll no-scrollbar text-white text-[2rem] pointer-events-none"
               style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
             >
               {inputValue.map((value, index) => (
                 <span
                   key={index}
                   className={`${
                    active[index] === true ? 'opacity-100 text-white' : active[index] === false ? 'opacity-100 text-red-500' : 'opacity-15'
                  }`}
                 >
                   {value}
                 </span>
               ))}
             </div>
           
             <textarea
               id="words-input"
               className="absolute top-0 left-0 w-full h-full bg-transparent text-transparent outline-none border-0 resize-none"
               onChange={(e) => {
                handleChange(e);
                const scrollContainer = document.getElementById('scroll-container');
                const currentSpan = document.querySelector(`#scroll-container span:nth-child(${currentIndex + 1})`);
                if (scrollContainer && currentSpan) {
                  currentSpan.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
              }}
             ></textarea>
           </div>
           
        }
      </div>
    </div>
  )
}

export default TypingGame;