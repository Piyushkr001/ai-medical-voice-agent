'use client';

import { UserProfile } from '@clerk/nextjs';
import React from 'react';

function Profile() {
  return (
    <div className="flex items-center p-10 justify-center">
      <UserProfile routing="hash"/>
    </div>
  );
}

export default Profile;
