import Colors from './Colors';
import normalize from '../helpers/normalizeText';

const Styles = {
  nav: {
    header: {
      backgroundColor: Colors.navigation,
      height: 70,
      borderBottomWidth: 0,
    },
    title: {
      color: Colors.white,
      fontSize: normalize(17),
    },
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  arrow: {
    position: 'absolute',
    right: 10,
    top: 15,
  },
};

export default Styles;
