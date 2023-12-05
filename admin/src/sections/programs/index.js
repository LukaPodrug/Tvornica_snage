import Program from '../../components/program'
import styles from './style.module.css'

function ProgramsSection({ programs, programEdited, changeProgramEdited }) {
    return (
        <div
            className={styles.wrapper}
        >
        {
            programs.length === 0 ?
                <label
                    className={styles.message}
                >
                    no programs found
                </label>
                :
                programs.map((program, index) => {
                    return (
                        <Program
                            key={index}
                            id={program.id}
                            name={program.name}
                            image={program.image}
                            programEdited={programEdited}
                            changeProgramEdited={changeProgramEdited}
                        />
                    )
                })
        }
        </div>
    )
}

export default ProgramsSection