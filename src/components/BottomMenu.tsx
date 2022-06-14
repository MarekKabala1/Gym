import {
    IoArrowUndoSharp,
    IoEllipseSharp,
    IoEllipsisVerticalSharp
} from 'react-icons/io5';
import styled from 'styled-components';

const BottomMenu = () => {
    return (
        <Wrapper className="bottomMenu_wrapper flex f-space-b">
            <div className="bottomMenu_arrow"><IoArrowUndoSharp /></div>
            <div className="bottomMenu_middle-button"><IoEllipseSharp /></div>
            <div className="bottomMenu_menu"><IoEllipsisVerticalSharp /></div>
        </Wrapper>
    )
}
const Wrapper = styled.div`

    svg{

    }
`

export default BottomMenu