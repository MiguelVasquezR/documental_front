import React from 'react';
import './style.css';

const Loading = () => {

  return (

    <section className='flex items-center justify-center w-screen h-screen opacity-2 bg-black/3'>
      <div className="hourglassBackground">
        <div className="hourglassContainer">
          <div className="hourglassCurves"></div>
          <div className="hourglassCapTop"></div>
          <div className="hourglassGlassTop"></div>
          <div className="hourglassSand"></div>
          <div className="hourglassSandStream"></div>
          <div className="hourglassCapBottom"></div>
          <div className="hourglassGlass"></div>
        </div>
      </div>

    </section>



  )
}


export default Loading;