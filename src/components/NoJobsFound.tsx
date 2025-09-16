import { ButtonSize, ButtonType, ButtonVariation, TypographyVariation } from "@digi/arbetsformedlingen"
import { DigiButton, DigiTypography } from "@digi/arbetsformedlingen-react"
import { useNavigate } from "react-router"

export const NoJobsFound = () => {
  const navigate = useNavigate();
  
  
  return (
    <div>
      <DigiTypography afVariation={TypographyVariation.SMALL}>
        <h2>Vi hittade inga jobbannonser</h2>
        <p>Inga jobbannonser matchade din sökning. Prova med andra sökord eller justera din sökning.</p>
      </DigiTypography>
      
      <DigiButton
        afSize={ButtonSize.MEDIUM}
        afVariation={ButtonVariation.FUNCTION}
        afFullWidth={false}
        afAriaLabel="Rensa sökning"
        afType={ButtonType.RESET}
        onAfOnClick={() => navigate("/jobs")}
      >
      Rensa sökning
      </DigiButton>
    </div>
  )
}