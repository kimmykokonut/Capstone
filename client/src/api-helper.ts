import { NewTripData } from "./components/NewTripForm";

export interface UserData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}
export interface UserSignInData {
  username: string;
  password: string;
}
export interface ProfileData {
  phone: string;
  avatar: string;
  family: string;
  skills: string;
  e_name: string;
  e_phone: string;
}
export interface TripData {
  date: Date;
  generalLocation: string;
  specificLocation: string;
  timeStart: string;
  timeEnd: string;
  leader: number;
  capacity: number;
  waitlist: number;
  restrictions: string;
  imageUrl: string;
  note: string;
  registrationClose: Date;
  permits: number[];
}
export interface PatchTripData {
  date?: Date;
  generalLocation?: string;
  specificLocation?: string;
  timeStart?: string;
  timeEnd?: string;
  leader?: number;
  capacity?: number;
  waitlist?: number;
  status?: string;
  restrictions?: string;
  imageUrl?: string;
  note?: string;
  registrationClose?: Date;
  permits?: number[];
}


export async function signUp(userData: UserData) {
  try {
    const response = await fetch('http://127.0.0.1:8000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData),
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      await signIn(userData);
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function signIn(userSignInData: UserSignInData) {
  try {
    const response = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userSignInData),
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const response = await fetch('http://127.0.0.1:8000/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function checkAuthentication() {
  try {
    const response = await fetch('http://127.0.0.1:8000/check-authentication', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function getProfile() {
  try {
    const response = await fetch('http://127.0.0.1:8000/profile', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function updateProfile(profileData: ProfileData) {
  try {
    const response = await fetch('http://127.0.0.1:8000/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(profileData),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function getTrips() {
  try {
    const response = await fetch('http://127.0.0.1:8000/trips', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function getUser(id: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}

export async function registerTrip(tripId: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/trips/${tripId}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// returns a boolean
export async function getRegistration(tripId: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/trips/${tripId}/register`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData.isRegistered;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
//returns who is accepted, waitlisted, rejected, registered(should be empty)
export async function getLotteryResults(tripId: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/trips/${tripId}/results`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function getUserRegistrations() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/user/registrations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function getPermitList() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/permits`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function getPermitsByIds(ids: number[]) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/permits?ids=${ids.join(',')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function getLeaders() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/leaders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// creates trip
export async function createTrip(tripData: NewTripData) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/trips`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function editTrip(tripData: PatchTripData, tripId: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/trips/${tripId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(tripData),
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function deleteTrip(tripId: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/trips/${tripId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const text = await response.text();
      if (text) {
        const responseData = JSON.parse(text);
        return responseData;
      }
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function getMushrooms() {
  try {
    const response = await fetch('http://127.0.0.1:8000/mushrooms', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
// Run lottery automatically via button for testing purposes
export async function closeTripRunLotto(tripId: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/trips/${tripId}/lottery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
//get 5 day forecast from openweather api
export async function getWeather(location: string) {
  const [lat, long] = location.split(',').map(Number);
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_WEATHER_API}`, {
      method: 'GET',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData.list;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}
export async function getTripById(tripId: number) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/trips/${tripId}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      throw new Error('Failed to fetch');
    }
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
}