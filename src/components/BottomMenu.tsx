import {
    IoArrowUndoSharp,
    IoEllipseSharp,
    IoEllipsisVerticalSharp
} from 'react-icons/io5';
import styled from 'styled-components';

const BottomMenu = () => {
    return (
        <Wrapper className="bottomMenu_wrapper flex">
            <div className="bottomMenu_arrow"><IoArrowUndoSharp /></div>
            <div className="bottomMenu_middle-button"><IoEllipseSharp /></div>
            <div className="bottomMenu_menu"><IoEllipsisVerticalSharp /></div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
    align-items:center;
    justify-content:space-between;
    padding:0 1rem 1rem 1rem;

    svg{
       height:2.2rem;
       width:2.2rem;
    }
`

export default BottomMenu