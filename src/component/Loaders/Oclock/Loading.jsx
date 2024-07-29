import React from 'react';
import './style.css';

const Loading = () => {

  return (

    <section className='flex items-center justify-center w-screen h-screen opacity-2 bg-black/3'>
      <div class="hourglassBackground">
        <div class="hourglassContainer">
          <div class="hourglassCurves"></div>
          <div class="hourglassCapTop"></div>
          <div class="hourglassGlassTop"></div>
          <div class="hourglassSand"></div>
          <div class="hourglassSandStream"></div>
          <div class="hourglassCapBottom"></div>
          <div class="hourglassGlass"></div>
        </div>
      </div>

    </section>



  )
}


export default Loading;