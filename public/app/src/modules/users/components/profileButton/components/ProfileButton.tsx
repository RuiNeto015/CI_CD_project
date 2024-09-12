
import React from 'react'
import { Button } from '../../../../../shared/components/button'

interface ProfileButtonProps {
  isLoggedIn: boolean;
  username: string
  onLogout: () => void;
  onProfile: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  return props.isLoggedIn ? (
    <Button 
      text={<span>{<u onClick={props.onProfile}>{props.username}</u>} / {<u onClick={props.onLogout}>logout</u>}</span>}
      onClick={() => {}}
    />
  ) : (
    <Button 
      text="Join" 
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.location.href = "/join"
        }
      }}
    />
  )
}

export default ProfileButton;