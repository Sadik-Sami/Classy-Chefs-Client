import { FiBarChart, FiBell, FiDollarSign, FiPlay } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';
import { useWindowSize } from '../../utils/useWindowSize';
import { useState } from 'react';

const VerticalAccordion = () => {
  const [open, setOpen] = useState(items[0].id);

  return (
    <section className='p-4 bg-base-100'>
      <div className='flex flex-col lg:flex-row h-fit lg:h-[450px] container mx-auto shadow overflow-hidden'>
        {items.map((item) => {
          return (
            <Panel
              key={item.id}
              open={open}
              setOpen={setOpen}
              id={item.id}
              Icon={item.Icon}
              title={item.title}
              imgSrc={item.imgSrc}
              description={item.description}
            />
          );
        })}
      </div>
    </section>
  );
};

const Panel = ({ open, setOpen, id, Icon, title, imgSrc, description }) => {
  const { width } = useWindowSize();
  const isOpen = open === id;

  return (
    <>
      <button
        className='bg-base-100 hover:bg-base-200 transition-colors p-3 border-r-[1px] border-b-[1px] border-base-300 flex flex-row-reverse lg:flex-col justify-end items-center gap-4 relative group'
        onClick={() => setOpen(id)}>
        <span
          style={{
            writingMode: 'vertical-lr',
          }}
          className='hidden lg:block text-xl font-light rotate-180'>
          {title}
        </span>
        <span className='block lg:hidden text-xl font-light'>{title}</span>
        <div className='w-6 lg:w-full aspect-square bg-indigo-600 text-white grid place-items-center'>
          <Icon />
        </div>
        <span className='w-4 h-4 bg-white group-hover:bg-slate-50 transition-colors border-r-[1px] border-b-[1px] lg:border-b-0 lg:border-t-[1px] border-slate-200 rotate-45 absolute bottom-0 lg:bottom-[50%] right-[50%] lg:right-0 translate-y-[50%] translate-x-[50%] z-20' />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={`panel-${id}`}
            variants={width && width > 1024 ? panelVariants : panelVariantsSm}
            initial='closed'
            animate='open'
            exit='closed'
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
            className='w-full h-full overflow-hidden relative bg-black flex items-end'>
            <motion.div
              variants={descriptionVariants}
              initial='closed'
              animate='open'
              exit='closed'
              className='px-4 py-2 bg-black/40 backdrop-blur-sm text-white'>
              <p>{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VerticalAccordion;

const panelVariants = {
  open: {
    width: '100%',
    height: '100%',
  },
  closed: {
    width: '0%',
    height: '100%',
  },
};

const panelVariantsSm = {
  open: {
    width: '100%',
    height: '200px',
  },
  closed: {
    width: '100%',
    height: '0px',
  },
};

const descriptionVariants = {
  open: {
    opacity: 1,
    y: '0%',
    transition: {
      delay: 0.125,
    },
  },
  closed: { opacity: 0, y: '100%' },
};

const items = [
  {
    id: 1,
    title: 'Eat Fresh',
    Icon: FiDollarSign,
    imgSrc:
      'https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Fresh vegetables and fruits are beneficial to your heart. The fiber in them reduces your blood pressure and keeps your heart healthy. Besides that, they help improve blood cholesterol and reduce the risk of obesity, type 2 diabetes, and heart failure.',
  },
  {
    id: 2,
    title: 'Eat Healthy',
    Icon: FiPlay,
    imgSrc:
      'https://images.unsplash.com/photo-1598214886806-c87b84b7078b?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Following a healthy diet has many benefits, including building strong bones, protecting the heart, preventing disease, and boosting mood',
  },
  {
    id: 3,
    title: 'Eat Tasty',
    Icon: FiBell,
    imgSrc:
      'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'What is better than eating healthy food which is also tasty and fresh from the countryside',
  },
  {
    id: 4,
    title: 'Eat Happily',
    Icon: FiBarChart,
    imgSrc:
      'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      'Eat happily, live happily and always remember that a sound mind lies inside a healthy body',
  },
];
