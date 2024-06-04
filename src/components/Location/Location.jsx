import React from 'react';
import { MdDateRange } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPhoneAlt } from 'react-icons/fa';
const Location = () => {
  return (
    <div>
      <h1 className='text-center my-20 text-3xl font-poppins font-semibold'>
        Our Meetup Venue
      </h1>
      <div className='grid lg:grid-cols-2 justify-items-stretch container mx-auto px-2 lg:px-0 font-poppins my-6'>
        <div className='row-span-4'>
          <h1 className='text-lg mb-5 font-semibold'>Fallbrook Art Center</h1>
          <ul className='space-y-6'>
            <li>
              <div className='flex items-center gap-x-2'>
                <MdDateRange className='w-5 h-5' />
                <p>22nd february - 7th march</p>
              </div>
              <p>8:00am to 5:00pm</p>
            </li>
            <li>
              <div className='flex items-center gap-x-2'>
                <FaLocationDot className='w-5 h-5' />
                <p>Fallbrook California 92028, USA</p>
              </div>
              <p>Event Address</p>
            </li>
            <li>
              <div className='flex items-center gap-x-2'>
                <FaPhoneAlt className='w-5 h-5' />
                <p>0085578934</p>
              </div>
              <p>Phone Number</p>
            </li>
          </ul>
        </div>
        <div className='row-span-8 w-full bg-red-400'>
          <iframe
            width='100%'
            height='600'
            frameBorder='0'
            scrolling='no'
            marginHeight='0'
            marginWidth='0'
            src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Fallbrook%20California%2092028,%20USA+(Chefs%20center)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'></iframe>
        </div>
      </div>
    </div>
  );
};

export default Location;
