import blankAvatar from '../assets/images/blank-avatar.svg'

const AvatarDisplay = ({ ticket }) => {
  return (
<div className="avatar-container">
<div className="img-container">
<img src={ticket.avatar ? ticket.avatar : blankAvatar} alt={'photo of ' + ticket.owner} />
</div>
<span className='owner'>{ticket.owner}</span>
</div>
  )
}

export default AvatarDisplay



