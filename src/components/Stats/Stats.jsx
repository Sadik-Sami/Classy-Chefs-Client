import React from 'react';

const Stats = () => {
    return (
        <div>
            <h2 className='text-center my-20 text-3xl font-poppins font-semibold'>
                Our Current Stats
            </h2>
            <div className='stats shadow flex flex-col md:flex-row my-6 font-poppins'>
                <div className='stat place-items-center'>
                    <div className='stat-title'>Hires From Us</div>
                    <div className='stat-value'>3K</div>
                    <div className='stat-desc'>
                        From January 1st to February 1st
                    </div>
                </div>

                <div className='stat place-items-center'>
                    <div className='stat-title'>Available Chefs</div>
                    <div className='stat-value'>5</div>
                    <div className='stat-desc'>↗︎ 40 (2%)</div>
                </div>

                <div className='stat place-items-center'>
                    <div className='stat-title'>Upcoming Chefs</div>
                    <div className='stat-value'>1,200</div>
                    <div className='stat-desc'>↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
