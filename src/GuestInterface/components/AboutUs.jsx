import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col items-center justify-center p-8">
      <section className="max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-500 text-white text-center py-8 px-4">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">We build the future, one block at a time!</p>
        </div>
        
        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-3xl font-semibold text-blue-600">Who We Are</h2>
            <p className="mt-4 text-gray-700 text-lg">
              At BlockBurst, we are passionate about creating interactive and engaging digital experiences. Our team of talented developers, designers, and strategists work together to bring innovative solutions to life.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-blue-600">Our Mission</h2>
            <p className="mt-4 text-gray-700 text-lg">
              Our mission is to revolutionize the gaming industry by delivering captivating, fun, and educational experiences. We believe in empowering creativity, promoting learning through play, and building strong communities.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold text-blue-600">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-4">
              <div className="text-center">
                <img 
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="w-32 h-32 mx-auto rounded-full border-4 border-blue-300"
                />
                <h3 className="mt-4 text-xl font-semibold">John Doe</h3>
                <p className="text-blue-500">Lead Developer</p>
              </div>
              <div className="text-center">
                <img 
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="w-32 h-32 mx-auto rounded-full border-4 border-blue-300"
                />
                <h3 className="mt-4 text-xl font-semibold">Jane Smith</h3>
                <p className="text-blue-500">Product Designer</p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
