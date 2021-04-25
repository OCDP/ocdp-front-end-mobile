import React, {useState} from 'react';
import {
  SliderContent,
  ItemSliderContainer,
  TitleSliderContainer,
  SubtitleSliderContainer,
  TextContainer,
} from './SliderIntro.styles';
import {Dimensions, ListRenderItem} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import HomeCare from '../../assets/img/HomeCare';
import CareOld from '../../assets/img/CareOld';
import MedicineSolution from '../../assets/img/MedicineSolution';

interface Props {}
interface ItemProps {
  title: string;
  subtitle: string;
  content: JSX.Element;
}

const SliderIntro: React.FC<Props> = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const windowWidth = Dimensions.get('window').width;

  const sliderItens = [
    {
      title: 'Acompanhe de qualquer lugar',
      subtitle:
        'Lorem impsum et amer at  doro et male impsum et amer at doro et male impsum et amer at doro et male ',
      content: <HomeCare size={450} />,
    },
    {
      title: 'Tratamento preventivo a todos',
      subtitle:
        'Lorem impsum et amer at  doro et male impsum et amer at doro et male impsum et amer at doro et male ',
      content: <CareOld size={450} />,
    },
    {
      title: 'Solicite exames e tratamentos',
      subtitle:
        'Lorem impsum et amer at  doro et male impsum et amer at doro et male impsum et amer at doro et male ',
      content: <MedicineSolution size={450} />,
    },
  ] as ItemProps[];

  const RenderItem: ListRenderItem<ItemProps> = ({index, item}) => {
    return (
      <ItemSliderContainer key={index}>
        {item.content}
        <TextContainer>
          <TitleSliderContainer category="h1">
            {item.title}
          </TitleSliderContainer>
          <SubtitleSliderContainer category="c2">
            {item.subtitle}
          </SubtitleSliderContainer>
        </TextContainer>
      </ItemSliderContainer>
    );
  };

  return (
    <SliderContent>
      <Carousel
        data={sliderItens}
        renderItem={RenderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        onSnapToItem={setActiveSlide}
      />
      <Pagination
        dotsLength={sliderItens.length}
        activeDotIndex={activeSlide}
      />
    </SliderContent>
  );
};

export default SliderIntro;
