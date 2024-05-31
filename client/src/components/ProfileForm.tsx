import { ProfileData, updateProfile } from "../api-helper";
import { Container, Box, Button, TextField } from '@mui/material';
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
      navigate('/dashboard');
    }).catch(error => {
      console.error('Error updating profile:', error);
    });
  };

  return (
    <>
      <Container>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <title>Update your info needed for field tirp registration</title>
          <fieldset>
            <legend>You</legend>
            <TextField name="phone" label="Phone Number" id="phone" defaultValue={user?.phone} variant="standard" />
            <TextField name="avatar" label="url of avatar image" id="avatar" variant="standard" defaultValue={user?.avatar} />
            <TextField name="family" label="Family you share a membership with" id="family" variant="standard" defaultValue={user?.family} />
            <TextField name="skills" label="skills? i.e. identication level" variant="standard" defaultValue={user?.skills} />
          </fieldset>
          <fieldset>
            <legend>Emergency Contact Info</legend>
            <TextField name="e_name" label="Name" id="eName" variant="standard" defaultValue={user?.e_name} />
            <TextField name="e_phone" label="Phone" id="ePhone" variant="standard" defaultValue={user?.e_phone} />
          </fieldset>
          <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>Update</Button>
        </Box>
      </Container>
    </>
  )
}
export default ProfileForm;