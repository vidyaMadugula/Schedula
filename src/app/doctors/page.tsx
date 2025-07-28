import DoctorList from '../components/DoctorList';
import UserDetails from '../components/UserDetails';

export default function Page() {
  return ( <div className="pb-20 md:pb-0">
      <UserDetails />
      <DoctorList />
    </div>);
}
