import styled from "styled-components";

const Icon = styled.div<{color: string, icon: string}>`
  // standard width
  width: 1.5rem;
  // standard height
  height: 1.5rem;
  
  // color of icon
  background-color: var(--color-${props => props.color});
  
  // pick our svg
  mask-image: url("imgs/icons/${props => props.icon}.svg");
  
  // contain yourself
  mask-size: contain;
  
  // right down the middle
  mask-position: center;
  
  // this icon is only big enough for one of us partner
  mask-repeat: no-repeat;
`;

export default Icon;
