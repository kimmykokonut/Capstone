import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../api-helper";

type User = {
  user: {
    first_name: string;
    last_name: string;
  };
  phone: string;
  e_name: string;
  e_phone: string;
  avatar: string;
  family: string;
  skills: string;
}

type Props = {
  user: User;
};

const ProfileForm = ({ user }: Props) => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    firstName: user?.user.first_name || '',
    lastName: user?.user.last_name || '',
    phone: user?.phone || '',
    avatar: user?.avatar || '',
    family: user?.family || '',
    skills: user?.skills || '',
    eName: user?.e_name || '',
    ePhone: user?.e_phone || '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    updateProfile(formValues).then(() => {
      navigate('/dashboard');
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <title>Update your info needed for field tirp registration</title>
        <fieldset>
          <legend>Your information</legend>
          <input type="text" name="firstName" placeholder="First Name" id="firstName" defaultValue={formValues.firstName} />
          <input type="text" name="lastName" placeholder="Last Name" id="lastName" defaultValue={formValues.lastName} />
          <input type="number" name="phone" placeholder="Phone Number" id="phone" defaultValue={formValues.phone} />
          <input type="text" name="avatar" placeholder="url of avatar image" id="avatar" defaultValue={formValues.avatar} />
          <input type="text" name="family" placeholder="Family you share a membership with" id="family" defaultValue={formValues.family} />
          <input type="text" name="skills" placeholder="what skills can you offer? i.e. identication level" defaultValue={formValues.skills} />
        </fieldset>
        <fieldset>
          <legend>Emergency Contact</legend>
          <input type="text" name="eName" placeholder="Name" id="eName" defaultValue={formValues.eName} />
          <input type="number" name="ePhone" placeholder="Phone" id="ePhone" defaultValue={formValues.ePhone} />
        </fieldset>
        <button type="submit">Update</button>
      </form>
      </>
  )
}
export default ProfileForm;