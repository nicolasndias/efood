import ProductsList from '../../components/ProductsList'
import Game from '../../models/Game'
import resident from '../../assets/images/resident.png'
import diablo from '../../assets/images/diablo.png'
import zelda from '../../assets/images/zelda.png'
import starWars from '../../assets/images/star_wars.png'

const promocoes: Game[] = [
  {
    id: 1,
    title: 'Resident Evil 4',
    category: 'Ação',
    system: 'Windows',
    description:
      'Resident Evil 4 é um jogo de ação e horror de sobrevivência desenvolvido e publicado pela Capcom. É o quarto título principal da série Resident Evil e foi lançado originalmente para o GameCube em 2005, antes de ser portado para várias outras plataformas.',
    infos: ['10%', 'R$ 250,00'],
    image: resident
  },
  {
    id: 2,
    title: 'Resident Evil 4',
    category: 'Ação',
    system: 'PS4',
    description:
      'Resident Evil 4 é um jogo de ação e horror de sobrevivência desenvolvido e publicado pela Capcom. É o quarto título principal da série Resident Evil e foi lançado originalmente para o GameCube em 2005, antes de ser portado para várias outras plataformas.',
    infos: ['5%', 'R$ 290,00'],
    image: resident
  },
  {
    id: 3,
    title: 'Diablo',
    category: 'Ação',
    system: 'Windows',
    description:
      'Diablo é um jogo de ação e RPG desenvolvido pela Blizzard Entertainment. O jogo se passa no mundo fictício de Sanctuary, onde os jogadores assumem o papel de heróis que lutam contra as forças do mal, lideradas por Diablo, o Senhor do Terror. O jogo é conhecido por sua jogabilidade viciante, gráficos sombrios e trilha sonora atmosférica.',
    infos: ['10%', 'R$ 250,00'],
    image: diablo
  },
  {
    id: 4,
    title: 'Diablo',
    category: 'Ação',
    system: 'PS4',
    description:
      'Diablo é um jogo de ação e RPG desenvolvido pela Blizzard Entertainment. O jogo se passa no mundo fictício de Sanctuary, onde os jogadores assumem o papel de heróis que lutam contra as forças do mal, lideradas por Diablo, o Senhor do Terror. O jogo é conhecido por sua jogabilidade viciante, gráficos sombrios e trilha sonora atmosférica.',
    infos: ['10%', 'R$ 250,00'],
    image: diablo
  }
]

const emBreve: Game[] = [
  {
    id: 5,
    title: 'Zelda',
    category: 'Ação',
    system: 'Windows',
    description:
      'Zelda é um jogo de ação e aventura desenvolvido pela Nintendo. O jogo se passa no mundo fictício de Hyrule, onde o jogador assume o papel de Link, um herói que luta contra as forças do mal lideradas por Ganondorf. O jogo é conhecido por sua jogabilidade envolvente, gráficos detalhados e trilha sonora memorável.',
    infos: ['17/05'],
    image: zelda
  },
  {
    id: 6,
    title: 'Zelda',
    category: 'Ação',
    system: 'PS4',
    description:
      'Zelda é um jogo de ação e aventura desenvolvido pela Nintendo. O jogo se passa no mundo fictício de Hyrule, onde o jogador assume o papel de Link, um herói que luta contra as forças do mal lideradas por Ganondorf. O jogo é conhecido por sua jogabilidade envolvente, gráficos detalhados e trilha sonora memorável.',
    infos: ['17/05'],
    image: zelda
  },
  {
    id: 7,
    title: 'Star Wars',
    category: 'Ação',
    system: 'Windows',
    description:
      'Star Wars é um jogo de ação e aventura desenvolvido pela LucasArts. O jogo se passa no universo fictício de Star Wars, onde os jogadores assumem o papel de heróis que lutam contra as forças do mal lideradas por Darth Vader e o Império Galáctico. O jogo é conhecido por sua jogabilidade envolvente, gráficos detalhados e trilha sonora memorável.',
    infos: ['15/06'],
    image: starWars
  },
  {
    id: 8,
    title: 'Star Wars',
    category: 'Ação',
    system: 'PS4',
    description:
      'Star Wars é um jogo de ação e aventura desenvolvido pela LucasArts. O jogo se passa no universo fictício de Star Wars, onde os jogadores assumem o papel de heróis que lutam contra as forças do mal lideradas por Darth Vader e o Império Galáctico. O jogo é conhecido por sua jogabilidade envolvente, gráficos detalhados e trilha sonora memorável.',
    infos: ['15/06'],
    image: starWars
  }
]

const Categories = () => (
  <>
    <ProductsList background="gray" title="RPG" games={promocoes} />
    <ProductsList background="black" title="Ação" games={emBreve} />
    <ProductsList background="gray" title="Aventura" games={promocoes} />
    <ProductsList background="black" title="FPS" games={emBreve} />
  </>
)

export default Categories
