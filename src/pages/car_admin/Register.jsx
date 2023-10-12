import Drawer from "../../components/common/Drawer";
import Calendar from "../../components/common/Calendar";

const RegisterPage = () => {
    // const contents = [
    //     <Button />,
    //     <Test />
    // ]
    return (
    <>
        <Calendar />
        <Drawer width={1000} tabTitles={['제목1', '제목2']} tabContents={["1", "2"]}/>
    </>    
    );
}

export default RegisterPage;