import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Modal from 'react-modal'

import store from '../../../../store'
import ModalHeader from '../../../../sections/modals/header'
import TextInput from '../../../../components/input/text'
import Image from '../../../../components/image'
import Button from '../../../../components/button'
import { editProgramAPI } from '../../../../API/program'
import styles from './style.module.css'
import '../../style.css'

function EditProgramModal({ isOpen, changeIsOpen, id, nameOld, imageOld, programEdited, changeProgramEdited }) {
    const [token] = useRecoilState(store.token)

    const [nameRecieved, setNameRecieved] = useState(nameOld)
    const [imageRecieved, setImageRecieved] = useState(imageOld)

    const [name, setName] = useState(nameOld)
    const [image, setImage] = useState(imageOld)

    const [nameError, setNameError] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        if(name === nameRecieved && image === imageRecieved) {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
    }, [name, image])

    function resetRecievedValues() {
        setNameRecieved(name)
        setImageRecieved(image)
    }

    async function editProgram() {
        if(name === '') {
            setNameError(true)
        }
        if(name !== '') {
            try {
                setLoading(true)
                const editProgramResponse = await editProgramAPI(token, id, name, image)
                setMessage(editProgramResponse.data)
                setSuccess(true)
                resetRecievedValues()
                setLoading(false)
                changeProgramEdited(!programEdited)
            }
            catch(error) {
                setSuccess(false)
                setMessage(error.response.data)
                setLoading(false)
                return
            }
        }
    }

    function clearForm() {
        setName('')
        setNameError(false)
        setImage('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7d13uF1Vtffx7zk56QlJIIXQpEMoIk2q0lEERFEQFVCqoCJ2rK+o91FAUMF+9eoVryJVEAEpoiC91wgqvUN6OymnvH+Mc8zOZu99dplzj7nW+n2eZzwnBEjGGnuuNedea645OxCR1A0HpgBTB2LiQEwq+fVEYMxAjAVGABOAroGfpcYN/JmlVgCLyn5vPtAz8HM5sBhYMvBzPjBvIOaW/PrVgXht4M8UkUR1eCcgUnDTgLWBdYA3DPwc/OcpJZFFrw3Eq8ALwPMD8Szw3MCvX3PLTqTgNAAQiWsY1rFvPBAblfx6Q2CUX2pJWAr8G3hi4Gfpr58Fev1SE8k3DQBEwugC1gO2BLYo+TkDuy0vjVsB/At4FJg58PNJ4BFgmWNeIrmgAYBI44YDmwLbl8S2qKNvl8GBwb0lcR82P0FE6qQBgEhtXdi3+Z2BnYA3A5tjt/YlHT3AY8BdwB3AndgdAz1CEKlCAwCRVU0Cdh+InbFv92NdM5JmLQLuwQYEtwK3YG8qiAgaAIhMxb7Z7wbsi93K73TNSGLpw+4S3IINCG7E3kQQKSQNAKRoxgJ7YJ39fsBWvumIo37gYeAG4HrgZjSPQApEAwDJuw5gO+BtWIe/K7ZIjki5ZdidgeuBa4H7fdMRiUsDAMmj0dgt/YOBQ7FFdUQa9So2ELgS+DOw0DcdkbA0AJC8mAYcMhB7YYMAkVC6gb8AfwQuRysYSg5oACBZti5wAPZN/+3YK3sisfUBtwMXA5eiiYSSURoASNasAxwBHAbsiNqw+OrH1hy4CLgQeNE3HZH66eIpWTAReCfW6eubvqSq9M7Ab4FZvumI1KYBgKRqBHZr/yjsNr9m7kuWLAOuBn4DXIVtpyySFA0AJDVbYp3+MdgiPSJZNxe7K/AzbM8CkSRoACApmMTKTv9NzrmIxHQv8L/A/6FlicWZBgDiaXvgROCDaL19KZal2PoC/42tRCjSdhoASLuNwp7tfxJblU+k6O7FBgK/BRY75yIFogGAtMsGwMeA44EJzrmIpGge8AvgR8DTvqmIiLRue+B8YAX2zrRCoagdvdjjgX0REcmY4cDR2Ixn74upQpHluAebI6O1LyQ4PQKQkMZit/g/DaznnItInjwDfA97RKB5AhKEBgASwmTg4wOxhnMuInk2C5sj8ANgtnMuknEaAEgrpgOfx17lG+Oci0iRLAZ+CnwHeMU5F8koDQCkGVOx2/yfQNvuinhaBvwa+DraiEgapAGANEIdv0iaBgcC3wBecM5FMkIDAKnHGsDnUMcvkrrl2FLDXwVe9U1FUqcBgNQyFpvY90W0eI9IlizCJgt+C1jgnIskaph3ApKkkcApwKXAIdjyvSKSHSOA3YHjsLsC92MLDIn8h+4ASLmDsfeNN/JORESCeRZ7LPAbbIEhEQ0A5D/eDJwNvMU7ERGJ5i7gM8At3omIv07vBMTdhsBFwB2o8xfJuzcDNwMXAOv7piLeNAeguMYAXwZ+B2yD7gaJFEUHsBXwEWA8Nvhf7pqRuNBFv5gOA84B1vVORKJZgE366gPmD/zeUqB74NcLgZ6BX3dhHQHYa56Dkz4nYHcJhwGrRc5X/DyNPRa4zDkPaTMNAIplS+A8YG/vRKRuy4HnsXe6Z5fErJKYXfJzNrb1cgzDsTUhJg/8HPz1lJJ/HoxpwNrYbHTJhuuBU4F/eCci7aEBQDGMBk7D3ufXBTk9c4Enq8QzZPv1rUnYPJNKsR7a5jY1PdjdwdOxO0aSYxoA5N87sAVB1nfOo+i6gZnAg8DDwCNYB/8c8b6xp244NgjYANh6IN6I3anS2hO+HsM2+fq7dyISjwYA+bUmcBZwlHciBfQS8CjW4d87EI+R7W/y7TQMeAM2ENge2GLg15ujN5faqR/4P+CTwBznXCQCDQDypwMbuZ+Jlu9thznAbcCtAz8fQEuvxjIBe2NlN2DXgVjdNaNieAH4GHCFdyISlgYA+bI+8HNgX+c88uwlbBGVWwd+3o/NtBcfG2JL3u428HMGuq7F8ifgZGxSqogkohNbu38RdttOESb6gPuwSVHvxma2S9rWBA4FvsvKwZl3O8pTzMH2F9AgSyQBG2Ere3lfGPISc4ALgQ9jnYlk21rAsdhql3Pxb195iRuxuy8i4uRobEEX74tB1uNR4Azs0cnwhj4ByZJh2KTC07DHN734t70sxwJsvpGItNHqwMX4XwCyGouwb/lHo9v6RbYm8CHs7sBi/NtlVuNCbL0HEYlsL+zdce+TPmvRDVyJdfrjGq665N1obCvs89FcmmbiWWDPRosuIvUZjq3OpduW9cdSVnb6Wste6lU6GNCdgfqjDzgXrTYqEtTm2GIy3id4FqIHe757IloHQVo3ARtAXgksw799ZyHuATZrptgislIH9t6tvoUMHQ8Dn0ALw0g8a2Cb5TyCf3tPPRahCYIiTZsC/BH/EznlWAT8EtilyRqLNGtX4FdocD5U/AEbOIlInbYDnsL/5E01HsVe5dK3ffG2GvZNV4/oqsdzwE7NFlikSI4GluB/0qYWC4CfYcu9iqRoe2wS3Bz8z5fUYilwQvOlFcm3UcAv8D9RU4unsOeu45svrUhbjcd20Hsa//MntfgZMLLpyork0DrAHfifnCnFfdjdkK4W6iriqRN7nfB2/M+nlOJebOMykcLbA3gZ/5MyhegDrscumiJ5sju24mAP/udZCvEa2rVUCqwDu7W9Av+T0TuWYouubNFSRUXStzE2T0DzfGwwdBraWVAKZjxwCf4noHcsAP4LmNpaOUUyZxrwLbSZVz92Z0TLc0shbATMxP+k84zFwJnA5BZrKZJ1U4Cz0XoCj6LthSXndgZewf9k84pl2Czg6a0WUiRnpmBbUnfjf556xSz0mq/k1Hso7nO/5VjHv07LVRTJt3WwOQJL8T9vPWIpcETLVRRJyKkUcxe/Xuz53satl1CkUN6ADZqLOEm4D9v5VCTTuoCf4n9CecSlwCatl1Ck0DbD1tP3Pp894kfAsNZLKNJ+47AtRL1PonbHTODtAeonIivtBTyI//nd7rgW229BJDPWonibg8zGHnVoxC4SRye2OmbRJhI/CKwboH4i0W0NPIP/SdOuWI5NWpoYongiMqSJ2BsDRZoo+AKwbYjiicSyL7a4jffJ0q64Etg0SOVEpFGbA1fjfx1oV8wH9g5SOZHADqY47/A+BrwtTNlEpEXvAP6J/3WhHdENHBimbCJhHI7dCvc+OWLHCuzW46gwZRORQEZhr84tw/86ETuWA4cFqZpIiz5IMd7VvR/YPlDNRCSONwJ34n+9iB09wLGBaibSlJPI/wI/S7AduzS7XyQburA3cvK+0VDfwHGKtN3n8T8BYsff0CQ/kazaALgO/+tI7PhqqIKJ1OM0/Bt9zJgLnIj26RbJg8OA1/C/rsSMM4JVS6SKDuC7+Df2mHEZMDVUwUQkCdOAy/G/vsSMc9CXFomkE9ucw7uRx4pFwAnBqiUiKfoIsBj/602s+Cl2rRYJpgP4Cf6NO1bcjZ71ixTF5uR7qfJfojsBEtBZ+DfqGNGHLeM7IlypRCQDurB1A3rwvw7FiHODVUoK7Zv4N+YY8SywZ7gyiUgG7QU8h//1KEacHq5MUkSfxL8Rx4hLgNUD1klEsmsC8Dv8r0sx4rSAdZIC+Tj+jTd0LAY+HLBGIpIfx2ELf3lfp0JGH/DRkEWS/Dua/K3w9wywQ8giiUjuvAl4Av/rVehBwPEhiyT5dSj5W9v/amBSyCKJSG6tDlyD/3UrZPQAR4QskuTP24Cl+DfWUNGHrZCl92JFpBEd2PPzPN0JXQ4cFLJIkh/7YntNezfSUDEXNXYRac07gXn4X89CRTewd9AKSeZtSb4a+T+wxT5ERFq1MfAQ/te1ULEA2CZohSSz1sLeifdulKHid8DYoBUSkaIbDfwv/te3UPE8sE7IAkn2jAfux78xhog+4IthyyMisoovY9ca7+tdiLgXGBe2PJIVw4Ar8G+EIWIp8MGw5RERqegw8jNf6mpsWWQpmB/i3/hCxGzgrYFrIyJSyy7Aq/hf/0LEfweujSTu8/g3uhDxBLBZ4NqIiNRjI+Bx/K+DIeIzgWsjiXov+Xi39XZgauDaiIg0Yg3gZvyvh61GH/D+wLWRxOyIrYfv3dhajUuwWbkiIt5GAhfgf11sNbqxRxuSQxsAr+DfyFqNc9HKfiKSlg5s+13v62Or8RqwSdjSiLfxwEz8G1cr0Qd8KnRhREQC+izZf03wUfR6YG50ABfh36ha7fxPCV0YEZEIPkL251n9Aes7JOO+gH9jaiV6gA+HLoqISEQfIPu7qn42eFWkrfbGOlDvhtRsLMPeWhARyZp3ku3dVXuA/YNXRdpiXbK9UMVS4JDgVRERaZ8DgCX4X0+bjVnA+qGLInGNBO7Cv/E0G4uw7YlFRLLurdgOfN7X1WbjTqxPkYz4Of6NptmYC+waviQiIm52wL5Ne19fm42fhi+JxHAC/o2llc5/u/AlERFxtx12jfO+zjYbx4YviYT0ZrI76WQx8JbwJRERScbOZPdxQDe2mqwkaArwLP6NpJlYAuwVviQiIsnZi+xODHwa2/9AEnMF/o2jmVgOHBihHiIiqdqf7N6t/UOEekgLTsa/UTQTPcD7ItRDRCR17ya7iwWdEKEe0oQZZHOHvz7guAj1EBHJiqPI5rLBi4DNItRDGjCcbL7v3wecFKEeIiJZcyzZ3EDoXmBEhHpInc7CvxE0E9rVT0Rkpc/if11uJr4doxgytLeSzXX+z4hRDBGRjDsb/+tzo9GL7TkjbTQReAb/D7/RuBjojFAPEZGs6wQuwf863Wg8B6weoR5Sxe/x/9AbjbuAMTGKISKSE6OBW/G/Xjcal8Qohrzesfh/2I3GE8DUGMUQEcmZycA/8b9uNxofilEMWWkjYCH+H3QjMQvYNEYxRERyajNgNv7X70ZiAbBhjGKIPR+6Cf8PuZFYhpb4FRFpxlvI3mqBfwM6ItSi8E7B/8NtJPqAI6NUQkSkGN5H9tYI0AJvgW1A9m79fzFKJUREiuXL+F/PG4k5wJpRKlFAHcB1+H+ojcTvolRCRKSYfo3/db2RuChOGYrnRPw/zEbiIWBslEqIiBTTOOBh/K/vjcQhUSpRIGsCc/H/IOuNucDGUSohIlJsm5Ct/uBFbNE6adJF+H+I9UYftr2liIjEcTDZ2j3wx3HKkH9vx//DayROj1IFEREp9U38r/f1Ri/2OqM0YAy2ep73h1dvXAcMi1IJEREp1Qlcjf91v954HBgVpRI5dSb+H1q98RSwRpwyiIhIBZOAf+N//a83vhGnDPmzJbAc/w+snlgMbBOnDCIiUsO2wBL8+4F6YhkwI04Z8uUv+H9Y9caH45RARETqcBz+/UC9cV2kGuTGYfh/SPWGtn8UEfGXpe3h9aZYFaOx5+neH1A98RywepwyiIhIAyYCz+DfL9QTz2CT3JPQ5Z1AiS8D63snUYc+bN/nOd6JiJQYjS2cNR0YD6yGTZRajZVvqEzEltZeASwq+bkcm8+yDHum+jK2iInauGTBPOAo4EbSfxtrPeDzJPLaeCrbFm4IPEo2XpU4A230Iz6mA1tje6VvNBAbAmsDEyL8fd3Y3a4XB34+j32DeQB4BBs0iKTiLOBz3knUoRubEPiMdyKpuBj/WzP1xL3AiEg1ECk1DVtL/AxsYuws/Nt/afRi7zdfBHwJOAhYK0olROozHLgT/3OjntCGcQN2Jhv7PS/CvnmJxDAS2A/4HvAY/u292ZgJnIst2TouaIVEhrYx2dg6vg/YNVINMqMDuAX/D6OeOCFSDaS41gM+AlyBDTC923joWA7cDHwV2C5QzUSGchL+bb+euI10HsO7OBz/D6Ge+EOsAkjhjMJed72ebNz5Chn/wCY/acdMie1y/Nt7PfGeWAVI3Uiysd7/LGBqpBpIcWyP3RqfjX+bTiHuAU4FprRSVJEq1iQb59q/Kei8sk/iX/x64uhYBZDc68JeT3oY/3acaizBtkzdqMkai1RzLP7tu574eKwCpGoc9q6xd+GHir9Q8Gc00pRO7DZ/lifztTt6gSuxScEiIXRgy+96t+2h4lVs7Y7C+Br+RR8qFqNvJdKY4cDxZOPRVsrxF2CfBmsvUsn6ZGOC7ZciHX9yJgPz8S/4UPGpWAWQXHortjiOd7vNU1wPbNHIhyBSwefxb8tDxTwKsrz8OfgXe6i4i/SXlJQ0rAH8jOLN6G9XLMcmT8ZY6VCKoQubdOrdloeKM2IVIBVrY8sgehd6qAvOG2MVQHKjEzgZmIt/my1CvIxt/ao5OdKMbbG9L7zbca1YjL29kFvn4V/koeKb0Y5e8mIK8Gf822oR4wa05LA05wz82+9QcU60o3e2Ful/+3+MbGxIJH72AF7Av60WOV4D3jnUByVSZjTwL/zbb61YjO0Dkjvfx7+4Q8Xboh29ZF0HtnBN6rcRixTnA2NrfWgiZQ7Ev90OFd+JdvRO1sRGNt6FrRV/jHb0knVjgT/h30YVr49HgU2rf3Qir3M1/u22ViwmZ6vPfhf/otaKZegiIpVNIjsbVhU15mPf7ETqMQOb7O3dbmvFWdGOvs3WIP2FGHJ3y0WCWA/bwMa7fSqGjhXYWwIi9TgX/zZbKxZha+Zk3tfxL2ateAW9YyyvNwN4Dv/2qag/+oDPVfowRcpMwiaTerfZWvHVaEffJmNJv8gnRDt6yar1UOef5fjG6z9Skdf5KP5ttVbMIuOTXFPf8e8BtOKfrGoNYCb+bVPRWnyl/IMVKTMMeBD/tlorMrtT4HDgafwLWCv2jHTskk1jgNvwb5eKMPFJRGrbG/92WiuewpYyzpyj8C9erbgk3qFLBnUAl+HfLhXhohd4DyK1XY5/W60VH4h36PHch3/hqsUKYJN4hy4ZlPrjKkVzsQTYCZHqNgN68G+r1eLueIcexx74F61W/CLeoUsGbQ8sxb9dKuLEi8B0RKr7X/zbaa3YPdqRR5DyrdTlwAbxDl0yZjXg3/i3S0XcuBFN+JXq1scWhPNup9Xi4mhHHtgbSPt2yo/iHbpk0M/wb5OK9sSXEKku5WtBDxn54noO/sWqFt3AOvEOXTJmO9IerCrCxgpgR0QqW5e0HwUmv2LtWGAu/oWqFt+Pd+iSMR3olb8ixoNk9LUqaYvz8G+j1WIu9qpyso7Hv0jVYhE53WdZmvIh/Nukwic+g0hl00l759pj4x166+7Bv0DV4oyIxy3Z0gU8iX+bVPjEQmBtRCo7G/82Wi3uinjcLXkz/sWpdcJPiXfokjEfwL9NKnzj54hUNhlYgH8brRbbhzrQzlB/EHBSwD8rtHOxTYlEQLeABY4BtvROQpI0i7TfFkuur51Ius9NlgJrxjt0yZh98G+TijTid4hUNhV7a8y7jVaKxdh2xi0LdQfgKNKdnfhr4GXvJCQZR3onIMk4HNjIOwlJ0qvAb72TqGIM8H7vJEqluu5/HzAj4nFLtgwHZuPfLhXpxA8QqWwzbEMp7zZaKZKZDLg1/sWoFpdHPG7JngPwb5OKtGIetn6JSCV/wr+NVos3tnpwIR4BHB/gz4jlHO8EJCkHeyfgYCm2gMhcbG/xlwZ+Pc8zqYRMwB4FiFSSch/yoVb/gI4W//8RwPOk+YrdPWjZT1nVfcC23kkE1gf8Ezu2h7FOfrCjn41th1vNcOzcnYKtM77pQGwPbEVxVsy7CdjTOwlJ1p3Ya+6peRVb2n6FVwLvwf82SLV4X8TjluwZhe0E6d0uQ8QLwA+BQ7A3cGIYC+wFnAk8msAxx4xe9KaQVHcE/m20Wrwr4nEP6fIqSXnHUxTn24vUJ+WFqurtpC7HvqmGXL+jXpsDZ2Fv1HjXIkZ8NFypJGeGAU/g30YrxaURj7umSaS7c9InIh63ZNOR+LfLZmIptmrd5uFL0pThwHGke0FsNq4MWSTJnU/h30YrRTfx7gLWdEITybYj5gPjIh63ZNMn8G+bjcbN2KtIKeoCTsHON+86hYgF2OBGpJLxpLs88DERj7uqvzaZbOz4ScyDlsw6Hf+2WW/Mx5b7bHWSbjusBfwR/5qFiN0C10by5b/xb6OV4rqYB13JWkBPgMRjxHYRj1uy63v4t8164ilgi0g1iKUD+ALpXhPqjU+HLozkyo74t9FK0Yv1yQ1rdjLR+7GJEam5byBEyi3zTqAOdwE7AzO9E2lQP7bd9iFko87V7OCdgCTtbuAB7yQq6ATe2+z/2IxUF87QFp9SzQLvBIZwG7A38Ip3Ii24CrsQub2X3KK8rREh4f3CO4EqDmvXX7QOtviI922P8lgErBbxuCXbPoR/G60WDwOrxzv0tjsZ/5o2E8vQ68NS2wTS3Pm2qccAzdwBeA9pTk66kPS/5YmfR70TqOJ5YH9gjnciAf0E+JV3Ek0YAbzBOwlJ2nzgEu8kKuikTYsC3YT/aKdS7BzzoCXzRpPe/t7LyG+7nUg2Fw3aJ0YxJFd2x7+dVoq/xDxogGmkOdP3oZgHLbnxZ/zbaml8PO7hujsK/xo3Gh+IUgnJmxSXx+6hwX15Gn0EcAhpzv7X5D+px2XeCZT4E7aef579DnjSO4kGpbixmaQnxcmAw4B3xvwLUtwbeRn5mkAl8YzFtsL1brOvYnfTiuAU/OvdSHwtThkkZyaT5uZiVzRyEI3cARiN7Q6WmuvI1wQqiWcxaXzrPolsv+7XiN9hM5SzYpR3ApIJs4AbvZOoYD9gTL3/cSMDgIb+4Da60DsByZQzgZcc//5fk9ajiNhmA7d6J9EADQCkXin2PaOxHUPr0sgA4KCGU4lvGdrFSxqziJUbWbXb08CpDn+vt2u9E2hAiq84S5r+QJorXx5Y739Y7wCgA3hHc7lEdQ32XqZII64CvtPmv3MFNsO8iO31Qe8EGpDiBV3SNA+43juJCg6mzoFsvQOAbYG1m04nnou8E5DM+iLw2zb+fV8Fbm/j35eSR7wTaMBS7wQkU1Lsg9YFtg75B34J/9mN5bEYGBfyIKVwhmGr1sVuqxdQ7FvLw0hz+fBKoR0BpRHjgSX4t9vy+Fw9ydd7B2C/Ov+7droae54r0qxebN36U4l36/dGVu5DUFS92IA9C2Z5JyCZspA057gE67PHYLfFvEc05dHU9ociVbwRuIWwbfT3aFb5oBfwv2bUE2+PVQDJrSPwb7fl0Y29EdCyAxI4mPJYhC3qIhJSB7at5v201j4XA1+g2Lf9y83C/7pRT2wRqwCSW2OwPsm77ZZHkLsA303gQMojxfcvJT86sA0/fgE8S/3tcilwPjYJR1bqIM09RMqjl0DfmqRwLsG//ZbHWUMlXc/e1yk+//+TdwKSa/3Y44BbBv55A2AP7G2YydgyvhMH/t0rwBPYDP9r0aqUlYwnzT1Eyr2A3ToVadRVwHu8kyjTct89hfRm7/ZRnHXURfJgK/yvG/XEVbEKILm3Jmn2lWvUSnqotwD2IL3nmPdRnHXURfJge+8E6nSfdwKSWS+T3rb0g48yqxpqAPCWcLkEc413AiLSkG29E6iTBgDSihT7prfW+pf13AFITYpFFpHqdvNOoA69wE3eSUimpdg3Nd2HT8JOCu/nGKUxh/omLopIGtYnvWejleLOSMcvxdEFzMW/LZdGDzChWsK17gDsPsS/93AddkAikg3vJb15RJWkuKmLZEsP8BfvJMoMA3at9i9rdfAp3rb7s3cCItKQI70TqJMGABJCio8Bak4ErOYm/G9flEYfML2ZAxERF/vhf92oJxYCIyLVQIplOuk98mr4rsQw7KTwTrw0NENXJFuux/+6UU+0c1toyb+H8G/TpbGAKgtxVXsEsDXpbbWb2rMVEaluD2Bf7yTqdL53ApIrqfVV46myx0W1AcBO8XJp2q3eCYhIXYYB53onUacXgRu8k5BcSbGv2rnSb2ZpAHCHdwIiUpePA9t4J1Gn/8NedxYJ5Zah/5O2a6hPfxj/5xal8c9mjlhE2m5j0ps/VCu2jlMGKbgn8G/bpVFxmeJKdwBGA5s3f9xRpHhLRURWNQLbqju1+UPV3IR92REJLbU+awYVtrquNADYhvRW20utmCLyemcD23kn0YAzvBOQ3Eqtz+rCduVcRaUBQIobd6T4TEVEVjoOOMU7iQY8CFzrnYTkVmoDAKjQt2dhADAbeNw7CRGpaj/gp95JNOjb2LNRkRgexfauScmbyn8jCwOA29CJKpKqnYBLSe+xYS1PYjmLxNJPem+uDXkHoOJzAme3eScgIhVtDVyNLTSSJV9Bm4pJfKk9BngjVVYEHLQZ/q8rlMdbWz9uEQlsR+BV/K8PjcYdZGN3Qsm+PfFv7+Wxca2ED00gwdLoA1arWWIRabe9gfn4Xx+auZ40tTOaSBMmkN7GQO8sTbD8EUDF9YIdPY1tZCAiaTgUuIpsDswvRG8USfvMB57zTqLMKn186gOAiqsXiYiLU4GLgVHeiTShG/iSdxJSOKn1YRoAiEhDOoGzgO9Tff+Q1P0/4CnvJKRwUuvDqvbxw4Al+D+jKI3DAh20iDRnNeBy/K8FrcSdDDH7WSSSI/Bv/6WxmCqD+A0TSK48NquvxiISwabATPyvA63EMtJ7tVmKYwv8z4HyWK9SovsnkFhpLEGjdhEvBwLz8L8OtBpfDV0YkQZ0YfNPvM+D0th7MLnSWwE13w908Ajap1uk3TqB04ErsdeYsux2tOGP+OoB/uGdRJmNBn/RWek3E5Ha5AmRvFsDe8Xva2R/sZx5wAeBFd6JSOGl1pf9p68vXb87tTsA2qdbpH22Ay4BNvBOJJBj0ax/SUNqfdl/+vqU7wA86p2ASEGciO25kZfO/wfAH7yTEBnwiHcCZV73Zb+D9F4B3DDwQYvIqkYDv8H/XA8ZtwEjQxZJpEWb4H9elMbC8gSnJpBUafQAwxsosIg0Zh3gLvzP9ZDxArBWyCKJBDAClSQ0lgAAIABJREFUm9DufX6UxiRY+Qhg3TjH3bTn0eQdkVh2B+7BdvTLi27gEOBF70REyiwHXvJOosy6kO4A4CnvBERy6mPAjcA070QC6geOwgY1IilKrU9bD9IdADztnYBIznQAZwI/JH+P1z4HXOqdhEgNqQ0A1oWVrwGmNgBIrVgiWdYF/Ax7NS5vzgLO8U5CZAip9WmrDADWdkykkqe9ExDJibHYFr4HeCcSwW+BL3gnIVKHp70TKLPKACC1mbOpjZZEsmg8cB2ws3ciEfwJOAZ7/i+SutT6tOmwcg5AahOCnvZOQCTjRgN/JJ+d/3XYVuF6U0iy4mnvBMqs0ufPxv+9xMFYhnYBFGnFCGxNf+9zOUZcjw1uRLJkGPY6oPf5MxivDCY2HOhLIKHBeKKZ6ooIYOfz5fifxzHiBtT5S3Y9hf85NBi9wLBObBXAlHb+etU7AZGM6gB+iS2IkzdXAQdjC/6IZNFr3gmU6AQmd5Le8/9Z3gmIZNRXgCO9k4jgCuA9qPOXbEutb5vWCUz2zqLMHO8ERDLoUODr3klE8Eus81/mnYhIi2Z7J1BmSiewuncWZVK6TSKSBRthHWVKj/Ja1Y8NaI7HnleKZF1qdwAmdQETvbMok9ooSSRlI4GLgAneiQS0HOv4f+OdiEhAqfVtE1McAKQ2ShJJ2beA7byTCGgedsv/Ru9ERAJLrW+b2EV63xxSGyWJpGoX4FTvJAJ6ATgQeNA7EZEIUuvbJnaiOwAiWTQG+DX5WTTrdmAH1PlLfqXWt03sRHcARLLoNGAT7yQC+Q2wD/CydyIiESU5ABjnnUWZ1Iokkpp1gc96JxFAD7ab39HoHX/Jv9S+3I7tIr2lNbUOgEhtZ2OPALLsJWxDn1u9ExFpk9QGAGO6sP3CU7EC7fAlUsu2WMeZZfcD7wKe9U5EpI2WYfvudA71H7bJ6E7SugOw3DsBkcR9nWwv+PN7YHfU+UsxpdTHjekkrVuJKRVHJDU7AAd5J9Gkfux5//uBJc65iHhJaUnrManNAUipOCKp+TzZ/PbfA5wE/I93IiLOUvqSO7oLGOWdRYmUiiOSkrWw5+ZZsxibs3CNdyIiCUjpS+7oLqDLO4sSGgCIVPZRYLh3Eg1ajD2y+JtzHiKpSKmP60ptAJDS6EgkFV3Y5jhZsgh4B/B370REEpJSHzesk7SWEk1pdCSSin2Bad5JNGAp9s1fnb/IqlLq47o0ABBJ3we8E2hAP3a34ibvREQSpDsANaRUHJEUjCFbk/++CPzWOwmRRKX0JVd3AEQStx8w3juJOl0InOmdhEjCUvqSOyyVJQlFpLK3eSdQp38DJ3onISL16wR6vZMoMcI7AZHEZGEA0AMcDizwTkQkcSO9EyjRm9oAIKXiiHjbBNjQO4k6nINt8CMitaX0JbcntQFASsUR8baHdwJ1eAr4hncSIhmR0pfc5O4AaAAgstJO3gnU4ctocx+ReqXUx/V0Ys/vUpHS6EjEW+oDgEewmf8iUp+U+rje1AYAKY2ORDyNA7bwTmII/wX0eSchkiEp9XE9ndiynalIqTginrYhrTU6yr0M/ME7CZGMSekOQHcn0O2dRYmUiiPiaVPvBIbwP2jhLpFGpfQlt7uTtCbwpFQcEU+beCcwhAu8ExDJoJS+5C5JbQCQUnFEPKV8B+CfwKPeSYhkUEpfcpMbAHQBw72TEElAyncArvZOQCSDRmKr76YiuTkAAGt4JyCSgHW9E6jhZu8ERDJosncCZZZ0Aou8syiTWpFE2m04MNE7iRpu9U5AJINS+3K7uBOY551FmdSKJNJuU4EO7ySqeBF41TsJkQxK7cvt3BQHAKkVSaTdpnonUIMm/4k0J7W+LckBgO4ASNFN8U6ghse9ExDJqNT6tvkpDgBSGyWJtNt47wRqeM47AZGMSq1vm5fiACC1UZJIu6X0rnC5F7wTEMmo1Pq2JB8BpDZKEmm3lBfEes07AZGMSm0AML+T9Gb0plYkkXZLeQCw0DsBkYxK7cvtqykOAFIrkki7aQAgkj+p9W2vdGK39Pq9MymR8gxokaJLbeEwkaxIaQDQB8zuBFYAc5yTKbUuae+DLhJbastzl1rgnYBIBnUBa3snUeI1oHdwY4JXPDMpMxxYyzsJEUeLvROoQXcARBq3DmltdPcqrNyZKKUBAMAG3gmIOEr5DkCPdwIiGZRan/YKrBwAvOSYSCWpFUuknVIeAPR5JyCSQet7J1DmZVg5AEhtda/1vRMQcbTEO4Eq1PmLNCe1L7XPwsoBwPOOiVSyvncCIo5SmpRbKqW3hUSyJLUBwHOQ7h2A1Iol0k6pnY+Der0TEMmo9b0TKLPKHYDULjjreycg4mj+QKRGjwBEmpPal9qk7wCk9sqESLvN9E6gAq0CKNK4kcB07yTKrDIAmEVaM4+HAet5JyHi6EHvBCqY7Z2ASAatx8q+NgULGdgEcDCpfuBJt3Qq29A7ARFHt3knUEFqdwpFsmAj7wTK/KevLx2VPOGQSC1beScg4uh60pt1f5N3AiIZtLV3AmX+NfiL0gHAvx0SqSW1oom008vAHd5JlPmrdwIiGZRaX/afvj7lOwBv9E5AxNkvvRMoMRO43TsJkQxKrS+r2Nfvj91yTCW6sR2URIpqFPa+rve52A8cGvlYRfKoC1iK//lbGntWSnTDBBIrjxl1lVgkv47B/zy8JPpRiuTTVvifv+WxbqVEh2FrkHsnVxqH11djkVz7A37n4N3AavEPUSSXPoB/P1oaiyl59F86B6AX+GfQQ29dapMnRDwcjc9rgddijwYXOPzdInmQWh82k5IVPcsXJ0ht9bHUJk+IeFgIvB24sE1/3yLgU8CBwNw2/Z0ieZRaH/ZorX/5FfxvUZTGUyGOWCRHDgMeJ8759grwX8CUth2NSL6lMol3ME6rleyhCSRYGn3AxCEKLFI0ncDbgF8DL9D8+dULPAScBxyA3roRCWki1od596OlcVBpguUnfM3bAw46sFsoN3snIpKQPuz5/LUD/7w+sDmwCTAOmDAQ44ER2MSf5dgOgy9hiww9DvyDtPYAEcmTN2F9WEpqPubvwi4I3qOU0vhigIMWERFppy/j33+WxiLK5v2VTwLsAR4Ocujh7OadgIiISIN2906gzIOUvAEAlbcovL89udRtV9LaSlFERKSWTmBn7yTKvK5vz8IAYBL2fFNERCQLtiK9CeyZHACAHgOIiEh2pNhn1TUAeAibC5CSFIspIiJSSWp9Vg8V3gCoNADoBh6Lnk5jUiumiIhINbt6J1BmJrYr4SqqTa67K24uDdsYmO6dhIiIyBDWAjbwTqLMHZV+s9oA4M6IiTRrF+8EREREhpDa639QpU/P0gBAjwFERCR1KfZVFe8AVDMM24HMe+Wi0kjx7QQREZFSD+PfX5bGfKp82a92B6AXuKepQ49nG+zZioiISIrWAbb0TqLMnZStADio1gp7qT0G6MB2QBMREUnR20lvA6Cqk/prDQBujZBIqw7wTkBERKSKd3gnUMHfm/mfJmCLB3g/vyiNuWjPchERSU8XMA//frI0VmDbgldU6w7AfNLbGXAisJN3EiIiImV2w744p+R+bEJ/RUPtsndz2FyC0GMAERFJTYp90021/qUGACIiIq1LsW9q6vn/oCnY6wPezzFKow8tCywiIumYTnp9ZS+wRq2kh7oD8BrwaD1H30YdwP7eSYiIiAx4B+m9/vcAMLvWfzDUAADgujC5BHWgdwIiIiIDUnz97/oQf8gB+N/KKI/FwLgQByciItKC8cAS/PvF8tgnxMGNwfYR9j6Y8nhfiIMTybGRwCS0doZITB/Evz8sjyXA6KESr+fCsAS4Ddirjv+2nQ4HLvROQiQBU4G9sfeQZwCbAdOA4SX/zVLgJeBxbF7P37FXhOa1NVOR/DncO4EKbga6Q/1hX8R/RFMe3cBqoQ5QJGMmASezcqOPZs6hHuAvwNHA2PamL5ILq2F9kXd/WB6fCXmQ2yZwQJXigyEPUiQDpgCnYyt1hjyXFgBnAKu37UhEsu9o/PvBSrFVyIPsAJ5L4KDK44qQBymSsOHYnbjFxD2n5gGnAMPac1gimXY1/v1geTwd40B/msCBlccy7FaoSJ5tAzxCe8+te7H5BCJS2SSsD/LuB8vjvBgHe1ACB1YpPhTjYEUScSx+rxgtBI6Mf4gimXQ8/v1fpXhbjIMdTfzbj83EVTEOViQBp+F/fvVjcwNEZFXX4X9ulsciYFSsA74ygQMsj+UMsd6xSAb9AP9zqzR+THpLnYp4mQqswP+8LI/LYx70CQkcYKU4NeZBi7TZN/A/pyqF7gSImM/gfz5WimNjHvRk0hz1zIx50CJtdAz+51Ot+Fi8QxfJjJn4n4vlsQLro6P6awIHWil2iXnQIm2wJWnOsymN5ehck2J7K/7nYaVoeOO+enYDLHdZE/9PO5zgnYBIC4YDF2B7b6RsOPBbtHKgFNfx3glUcWk7/pK1aX7p0ZixBJgY8bhFYvoc/udQI3FmnDKIJG0Cad6l6wWmRzzuVdzehgNqJk6OedAikayJLcXrff40EsuBzWMUQyRhH8f/3KsUf2vmYJp5BABwcZP/X2wneicg0oRPY3uKZ8lw4KveSYi0WaqPmi9p51+2FraTmPeop1LsEPG4RUKbRPa+/Q9GD7Bp+JKIJOnN+J9zlWIFtv13w5q9A/Aitpd4ilIdoYlU8gGy9+1/0DB0102KI9W+5QbglXb/pcfhP/KpFAvI7gVViucO/M+ZVuJloCt4VUTSshq2N4b3+VYpPhTxuKuaCCxtItl2xKciHrdIKOvgf66EiL1CF0YkMamu/NeNvZnQlGYfAYDtG35NC/9/TJ/GJimJpGxv7wQC2cc7AZGIuoBPeCdRxZXA/Gb/51YGAADnt/j/x7IO8B7vJESGsId3AoHkZSAjUsnhwHreSVTxf55/+QjgVfxvg1SKeyIet0gId+F/noSIRWinQMmve/E/xyrFy7R4p7vVOwDLsWVBU7Q9sKd3EiI1bOKdQCBjsbtuInmzD7CddxJV/AZ7BdDVVviPhKrFlRGPW6QVE/E/P0LGW8OWRyQJ1+B/blWLrSMed0NSvUXSB2wR8bhFmrUe/udHyDgobHlE3G1Fmvve9GOvD7es1UcAg34V6M8JrQO9EihpGuedQGBae0Py5tOkO7clqT53ImnukNSPrVXQtl2SROq0Gf7nRsg4PGx5RFxNw96x9z6vKsVCbGGiloW6AzAP+H2gPyu0kcAp3kmIlFnknUBgC7wTEAno08Ao7ySquIAEz7cd8R8Z1RoxTY136CING0u6zxebiZ3ClkfEzRTS3qBr+3iH3pq78S9OtfhOxOMWacaL+J8XoWL1wLUR8fI9/M+nahFk8l8sx+NfoGrRDawd79BFGvZX/M+LEPFq6MKIOJkOLMH/nKoWx4Q82FBzAAZdgM0HSNEo4DTvJERK5GW1yju9ExAJ5CvAaO8kqpgLXBjyDww9AFgM/CLwnxnSR4D1vZMQGXCTdwKB3OidgEgA62Hb3Kfq59jdiaS9AVue0PtWSbX4abxDF2nIaqT7qlEjocW2JA9+gf+5VC1WkO6GRK9zCf4FqxbLgQ3jHbpIQ1I+V+qJe8OXRKTtNsb6Bu/zqVqk+pp9RW/Bv2C14lfxDl2kIe/C/3xoJT4ZviQibfcb/M+lWrFLvEOP4x78i1YterCV2ES8DQP+if850UzMw1YBFcmyGVif4H0+VYtMTrI9Ev/C1Yo/xDt0kYachP/50EycHqEWIu32R/zPpVpxRLxDj6cLeAr/4tWK/aMdvUj9RgCP4X8+NBIvo2//kn374H8u1YonsL40k07Bv4C14lEyXFzJlf3xPx8aiSPjlEGkbbqAh/E/l2rFSdGOvg3GYKuEeRexVpwc7ehFGvM7/M+HeuIq0t0mVaRen8D/XKoVr5DuokR1+xr+hawVs4E1oh29SP0mAE/if07UiueBybEKINImqwOz8D+fasWXoh19G62O7cbnXcxa8f1oRy/SmO1I93xZjHb9k3z4Ef7nU61YQI7m2JyNf0FrxQpgy2hHL9KYA0hvNc0e4N0xD1qkTbYgvfOrPL4V7egdTMO+PXgXtVZcH+3oRRp3COksE7wMODzu4Yq0zbX4n1O1Yj453F77u/gXdqh4R7SjF2nc2/F/HDAf2Df2gYq0SRZW3jw91sF7WpO091nux1Zky/ysS8mVzYBH8DkfZqKNfiQ/xmDv1Xv3M7ViDjYZOJe+j3+Bh4pvRzt6keaMB34M9NKec2AFcA4aDEu+pD4XrZ+czPyvZjrp3wVYAbwpVgFEWrArcBdx2/9fUfuX/NmBtNf778fWzBkXqwCpOAv/Qg8VDwDDYxVApEUHAbcQrr33An8G9mjnQYi0SRe2bbV3vzJUfDZWAVIyCXvO4V1sfRiSdZtjrws9CPTRWPvuAW4Hvgys2+7ERdroi/j3J0PFS9gchbbyWs7zK8A3nf7uenUDbwT+7Z2ISB2mYXuGz8AmDk7F5g6Mxl7BXYhdZB7H9sC4DZvhL5Jnm2AD5NTns5wKnOedRLuMxXYT8x51DRV/RWuei4hkUQdwA/79yFDxAukPUIJLfSOGwTgmVgFERCSaE/DvP+qJTO/416wR2O117+IPFXOwNQxERCQbpgNz8e8/hop/Yn1hIb0X/w+gnrgiVgFERCSoDuBK/PuNeqLw+2v8Hf8PoZ4o5G0aEZGM+Rj+/UU98bdIx58pb6bxV5g8ohvYKlINRESkdVuQ/sZz/Vift0OkGmTOBfh/IPXEfRT4eY2ISMJGAvfj30/UE+dHqkEmrU/6SwQPxnfilEBERFpwDv79Qz2xGC2+9Tpfx/+DqSd6gX0i1UBERBq3H+3bLKvV+EqkGmTaaOBJ/D+ceuJ5YI04ZRARkQZMBl7Ev1+oJ54ARsUpQ/Ydiv8HVG9cFqkGIiJSv4vw7w/qjXdGqkFuXIf/h1RvHB+pBiIiMrSP4N8P1BvXRKpBrswAluH/YdUTS4Dt4pRBRERq2AF7Pdu7H6gnlmGbdEkdvon/B1ZvPIM9gxIRkfZYnezMGesHTo9ShZwaiW1Z6v2h1Rs3AMOiVEJEREp1An/G/7pfbzyGJv41bBey81pHP/BfccogIiIlzsD/el9v9AK7xylD/v0E/w+w3ugD3hOnDCIiAhxCNpaOH4wfxClDMawGPIf/h1hvLMAmMYqISFibAvPwv87XGy8AE6JUokAOxP+DbCQewwYuIiISxjjgEfyv743EIVEqUUAX4/9hNhKXYXtSi4hIazrI1mI//cDvo1SioNYE5uD/oTYSWu9ZRKR1X8P/et5IzAamRalEgR2P/wfbSPQBR0WphIhIMRxBtib99QPHRKlEwXUA1+P/4TYSy9HOgSIizXgrsBT/63gj8Vf0+DeaDbGZ9t4fciMxG9g8RjFERHJqBtl77Dsf2CBGMWSlD+P/QTcaT6JnQiIi9ZgM/Av/63ajoUe+bXIB/h92o3E3MDZGMUREcmI0cDv+1+tG4+IYxZDKJgJP4/+hNxpXoj0DREQq6cReofa+Tjcaz2GbE0kbvQXowf/DbzTOjlEMEZGM+z7+1+dGoxfYK0YxZGjfxr8BNBOnxSiGiEhGfQr/63IzoU3gHHUBd+DfCBqNPuCjEeohIpI1H8P/mtxM3AMMj1APacDGZO/VwMFBwPER6iEikhVHk61t3wdjEbY5kSTgRPwbRDPRg610JSJSNIcCK/C/DjcTx0aoh7Qga5tFDMZy4KAI9RARSdX+ZG+Vv8G4LEI9pEVrkM1XA/uBbmDv4BUREUnPPtg1z/u620w8iV75S9abgMX4N5JmYjH2aqOISF7tDCzE/3rbTHQD24cviYR0DP4NpdmYixqYiOTT9tg1zvs622x8KHxJJIaf4t9Ymo15wK7hSyIi4mZHbGM07+trs/HD8CWRWIYDt+DfaJqNRcB+wasiItJ+e5DNV7UH43ZgRPCqSFTTgRfxbzzNxlLgXcGrIiLSPgcCS/C/njYbLwNrB6+KtMVeZPc9037sFcHDgldFRCS+w7FrmPd1tNlYgd29kAz7DP4NqZXoQYtOiEi2fJBsf/nqBz4ZvCri4kL8G1Mr0QecGrwqIiLhnUQ2l/ctjQuCV0XcjAMewb9RtToI+FzowoiIBPQF/K+VrcbDWJ8hObIBNqHDu3G1GucCnYFrIyLSig7gdPyvj63Ga9gGc5JDO2Cv2Hk3slbjMmBM4NqIiDRjFNl/zNqPva2wS+DaSGIOwibWeTe2VuNOYFrg2oiINGIy2V5zZTB6sd0JpQCy/mbAYDwJzAhcGxGRemwM/BP/62CI0Iz/gjkP/0YXIuYAe4YtjYhITbthz8u9r38h4meBayMZMAy4HP/GFyKWAUeGLY+ISEWHk93tfMvjKqArbHkkK8YB9+LfCENEH/CVsOUREfmPDuBr2LXG+3oXIu4BxgatkGTOdOAZ/BtjqLgcmBC0QiJSdOOAi/C/voWK54F1glZIMmsLsr1PdXk8NnBMIiKt2hRbHMf7uhYq5gNvDFohyby9yPauVeUxDzgkaIVEpGjejXWY3tezULEETZqWKvbHtuH1bqShog84A5vwKCJSr2HYyn5ZX9O/NJZj2xOLVPVusr+LVXncCEwNWSQRya01gGvxv26FjB7gfSGLJPl1FPka+fYDzwI7hiySiOTOttgCY97Xq5DRBxwXskiSfyeTn9ddBmMJcHzIIolIbpxEft7vL+38TwpZJCmOU/FvwDHiMuw2n4jIZPKzKFp5fD5gnaSATse/EceIl4EDwpVJRDJoH+ydeO/rUYz4WsA6SYGdiX9jjhF9wLnAyHClEpEMGE7+ZvmXxveDVUoKrwP4Mf6NOlY8DGwdrFoikrIZwH34X3dixf9g12yRYDqBn+DfuGPFYjRZRiTPOoCPkq8Fz8rjJ9i1WiS4DuBs/Bt5zLgCWDNUwUQkCdOBK/G/vsSM76Bv/tIGp+Hf2GPGXOBEdDKJZF0HcDQwC//rSsw4I1TBROrxcfK3TkB53AxsFqpgItJWGwLX438diRl9wGdDFUykER8hv7NoB2MJNlt4eJiSiUhkXdgaJovwv37E7vw/EahmIk35APnbO6BSPICWEhZJ3TbA3fhfL2JHD/DhMCUTac07ydcugtViBbZuwNgwZRORQEZjz8F78L9OxI5lwHvDlE0kjHeQ79drSuNfwEFhyiYiLToEeAL/60I7YglawVQStRcwD/+TpF3xZ2xRERFpvy3J/yS/0pgH7BmicCKxbAk8jf/J0q5YAfwMmBKgdiIytEnYo7gizD0ajOeBN4Uonkhs0ynGRJzSmIPNPO4KUD8Reb0ubH2OV/E/39sZDwDrBKifSNuMBf6I/8nT7ngMmw8hIuHsAzyE//nd7vgzMD5A/UTabhjwQ/xPIo+4HC0iJNKqGRTzi0Q/8APsGiqSaaeS/wWDKkUvcBGwSeslFCmU9bG5NUV6zj8YfdjiYyK58W5sxz3vk8sjlgPnY0uTikh161Hcjr8f6Abe13IVRRL0ZuBl/E8yr1iGXdzWbrWQIjkzFVvIpxv/89QrZgG7tVpIkZRtCDyC/8nmGUuAc9CrgyJTge9R7I6/H3gY2KDFWopkwjjgQvxPOu9YCHwbWLO1copkznTgTPK/YU898XvsmihSKCdiz8e9T0DvWIbNEdiqtXKKJG8TbBGfoiwbXitWAKcBHS1VVCTD3gK8hP/JmErcAhzcUkVF0rM7cCU2w937HEshXsXWNhApvLWB2/A/KVOK+4GjgeEt1FXEUyc2mL0D//MppbgbeEMLdRXJnZHAT/A/OVOLp4FPodXAJDvGA58GnsH//EktfgSMaL60Ivl2JMVdL6BWLMEWFdq3+dKKRLU99prrAvzPl9SiGziu+dKKFMebKM7+3s3ETGzy0BrNFlgkkAnYZN778D8vUo1ngR2bLbBIEa0BXIr/yZtyLAF+jU2wEmmnt2Bvrmg2f+24BFi9yRqLFN7x6F3hemImNldAiwtJLFOBzwD/wL+9px4L0S1/kSA2AG7F/6TOQvRgrxKeigYD0rqJ2NsoV6I1O+qNu4BNmym2iFTWhe2Q1YP/CZ6VGBwMnIg9qxWpxxjgMKzTX4Z/O85K9GGLHGmWv0gku6AJgs3EUuyCfjR6pVBebzT2zv756C2cZuIZYI+Gqy4iDZsIXID/SZ/VWIxNTjoGW5Ndimkt7Dn1pWgyXytxAXZNEpE2OgyYi/8FIOvxBHbrcl90+zLPhmHv6p8O3IOW5W01FmCP10TEyQbADfhfDPIS87C7A8dhSzRLtq2DvUlzKTAf//aVl7gBbd8rkoQO7Hb2HPwvDHmLB7H92t+LHhdkwVrYnbHvAw/h337yFrOxa4128BNJzDRsEpP3RSLP8SK2JPGp2O3kzro+GYllQ2xi58+AR/FvH3mOK9FdsVzRKC6fDgZ+jN3+lLjmYTs53joQDw78noQ3EVsmezdg14HQ5LP4ngc+ig0AJEc0AMivscBXgc+hb6nt9hL2bXQmcO/Arx/B3imXoXUB6wFbYndZthj49Qx0zWqnfuDn2DVkgXMuEoFOpvzbDTuJZ3gnUnDLsAHBQ9hg4GHgSez96eWOeXkaie0LvwGwdUlsid7G8DYTm+F/q3ciEo8GAMUwEvgS8AV0YU1NHzav4GngqZIY/OfngV6n3FrVhT2GWh/r5Ad/DsZ0dHcqNcuBbw+E7ljlnAYAxbIZcB6wv3ciUrcV2ADhFWwG9qyBn4PxWoXfi3XhHontUjkYU4DJA7+eXPbv1sRm5HdFykXCuxab3Pq4dyLSHhoAFNO7gO+i93jzrBtb/hhsUmI/9u1u8cDvLcIGFwDDgXEDvx6L3SXqYOUEu1HYUrmST08Cnwau8E5E2ksDgOIaDXwC+AorL/4iUhzdwFnAGawcLEqBDPNOQNz0YBN8foutH7AVGhCKFEE/8Dvg3diIlXEwAAAD9ElEQVS3/h7fdMSLLvgyaAfgbLSjl0ie3Ynd7r/NOxHxpxm4MugeYE/gncC/fVMRkcD+BRyObSeuzl8A3QGQykYAJ2DzA9Z0zkVEmvc88C3gfyjuehNShQYAUssY4BTgNGCScy4iUr/XgHOw1367nXORRGkAIPUYj60F/uWBX4tImmYDP8Q6/4XOuUjiNACQRkwBPgZ8CljNORcRWWkhtgHYt4H5zrlIRmgAIM2YDHwcDQREvC0CfoS9y69dKKUhGgBIK6YAnwVORo8GRNppIXar/2xgjnMuklEaAEgIqwHHAJ/H1n8XkThew271n4c6fhFJyEjgaGwzkX6FQhEsnsI26hmDiEjCuoAjsFXHvC+cCkWW407sXNKy7SKSOdsD52OLkHhfTBWKLEQvcCWwLyIRaQ6AtMt62CuEJ6BFhUQqmQf8HJvV/4xzLlIAGgBIu43E9hs4EX3DEQG4F/hvbGfOxc65iIi0xRbAudgrTd63XRWKdkY3cBGwKyJOdAdAUjABeD/2KuGbnXMRieku4FfABWjFPnGmAYCkZnPgwwMxzTUTkTDmAJcAPwEecM5F5D80AJBUDQcOwNYVOBAY5ZuOSEOWAldhb8BcA6zwTUfk9TQAkCwYgw0Cjgbehg0ORFLTB9yOdfq/Bxb4piNSmwYAkjXTgMOBw4DdgE7fdKTg+oBbsQl9FwOv+KYjUj8NACTLJgPvwAYDujMg7dIL3IF1+BcDL/qmI9IcDQAkLyYDhwAHY+sLjPVNR3JmMXAD8EfgCmC2bzoirdMAQPJoFLA7NhB4N7CpbzqSUc8A12Id/zXAIt90RMLSAECKYGvg7cB+2MBgtG86kqhu4O/A9VjH/7BvOiJxaQAgRTMKeAt2d2A/YBs0kbCo+oAHsQ7/euAW7PU9kULQAECKbjywEzYg2B3YERjhmpHE0gs8jnX0NwA3omf5UmAaAIisajw2ENgN2BkbEKzmmpE0awFwNzZj/1as41/ompFIQjQAEKmtE9u0aCdgF2xAsAXQ5ZmUvE4P8A9srf3bgTuBmdhtfhGpQAMAkcYNx94s2L4k3oRePWyX5cC/sW10B+M+YIlnUiJZowGASDhrYXcHtiz5uQ0wzjOpDBvs6B/Fvs0P/nwMe54vIi3QAEAkrg5gXWAjYOOB2KjkZ9EHBwuBJ7GO/omyn88B/X6pieSbBgAiviZhA4T1BmKdgX9eC5gKTBn4mbVztQ94bSBewZbLfR7r1J/DFtl5HpjrlaBI0WXtoiJSRMOwgcBgrA5MrBBjsLcYRmGLHY3FXmmcwKprHQz++1LdrPoOfB8wH7sNvxh7vr4M+8a+BJhXIeawstN/Dd2mF0na/wdVAjBy3hMFjgAAAABJRU5ErkJggg==')
    }

    function closeModal() {
        setMessage(null)
        clearForm()
        changeIsOpen(false)
    }

    function uploadImage(image) {
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = () => setImage(reader.result)
    }

    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
        >
            <div
                className={styles.wrapper}
            >
                <ModalHeader
                    title='edit program'
                    closeModal={closeModal}
                />
                <form
                    className={styles.form}
                >
                    <Image
                        image={image}
                        showUpload={true}
                        upload={uploadImage}
                        style={styles.image}
                    />
                    <div 
                        className={styles.inputs}
                    >
                        <TextInput
                            label='name'
                            showPlaceholder={false}
                            placeholder=''
                            text={name}
                            changeText={setName}
                            error={nameError}
                            changeError={setNameError}
                            message={message}
                            changeMessage={setMessage}
                            labelStyle={styles.label}
                            inputStyle={styles.input}
                        />
                    </div>
                </form>
                <Button
                    disabled={disabled}
                    text='submit'
                    method={loading ? () => {} : () => editProgram()}
                    loading={loading}
                    showMessage={true}
                    message={message}
                    changeMessage={setMessage}
                    buttonStyle={styles.button}
                    messageStyle={success ? styles.messageSuccess : styles.messageFail}
                />
            </div>
        </Modal>
    )
}

export default EditProgramModal