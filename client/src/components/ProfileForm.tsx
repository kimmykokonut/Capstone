import { ProfileData, updateProfile } from "../api-helper";

type User = {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formValues: ProfileData = {
      phone: formData.get('phone') as string,
      avatar: formData.get('avatar') as string,
      family: formData.get('family') as string,
      skills: formData.get('skills') as string,
      e_name: formData.get('e_name') as string,
      e_phone: formData.get('e_phone') as string,
    };

    updateProfile(formValues).then(() => {
      window.location.href = '/dashboard';
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <title>Update your info needed for field tirp registration</title>
        <fieldset>
          <legend>Your information</legend>
          <input type="text" name="phone" placeholder="Phone Number" id="phone" defaultValue={user?.phone} />
          <input type="text" name="avatar" placeholder="url of avatar image" id="avatar" defaultValue={user?.avatar} />
          <input type="text" name="family" placeholder="Family you share a membership with" id="family" defaultValue={user?.family} />
          <input type="text" name="skills" placeholder="what skills can you offer? i.e. identication level" defaultValue={user?.skills} />
        </fieldset>
        <fieldset>
          <legend>Emergency Contact</legend>
          <input type="text" name="e_name" placeholder="Name" id="eName" defaultValue={user?.e_name} />
          <input type="text" name="e_phone" placeholder="Phone" id="ePhone" defaultValue={user?.e_phone} />
        </fieldset>
        <button type="submit">Update</button>
      </form>
      </>
  )
}
export default ProfileForm;