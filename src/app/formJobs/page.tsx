import FormJobs from '../../components/FormJobs/FormJobs';
import Collaborators from '../../../public/collaborators.svg'


const formJobs: React.FC = () => {
  return (
    <div>
      <FormJobs title="Create Your Best Job Proposal" img={Collaborators} width='w-[840px]' textButton='Create Proposal' />
    </div>
  );
};

export default formJobs;