import "./JobList.css";
import placeholder from "../../assets/placeholder.svg";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";
import { getJobs } from "../../services/JobService";
import type { IJob } from "../../models/IJob";

import {
  DigiLayoutBlock,
  DigiLayoutContainer,
  DigiLayoutMediaObject,
  DigiList,
  DigiMediaImage,
  DigiNavigationPagination,
  DigiTypography,
} from "@digi/arbetsformedlingen-react";

import {
  LayoutMediaObjectAlignment,
  TypographyVariation,
} from "@digi/arbetsformedlingen";
import { JobSearch } from "../../components/JobSerch";
import { NoJobsFound } from "../../components/NoJobsFound";

export const JobList = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [total, setTotal] = useState(0);
  const [searchParams] = useSearchParams();
  const searchText = searchParams.get("search") || "";
  const limit = 10;

  let page = parseInt(searchParams.get("page") || "1", 10);
  if (isNaN(page) || page < 1) page = 1;

  useEffect(() => {
    const getData = async () => {
      const res = await getJobs(searchText, limit, page);
      setJobs(res.hits);
      setTotal(res.total);

      console.log(res.total); //????? varför är det inte ett NUMMER??
    };

    getData();
  }, [searchText, page]);

  const navigate = useNavigate();
  const handlePageChange = (event: CustomEvent<number>) => {
    const newPage = event.detail;
    navigate(`?search=${searchText}&page=${newPage}`);
  };

  const searchJobs = async (searchText: string) => {
    const searchResults = await getJobs(searchText);
    setJobs(searchResults.hits);

    navigate(`/jobs?search=${encodeURIComponent(searchText)}`);
  };

  return (
    <DigiLayoutBlock>
      <DigiLayoutContainer className="page-container">
        <JobSearch search={searchJobs} />
        
        {jobs.length > 0 ? (
          <div>
            <DigiList className="job-list">
            {jobs.map((j) => (
              <li key={j.id}>
                <DigiLayoutMediaObject
                  className="job-list-item"
                  afAlignment={LayoutMediaObjectAlignment.CENTER}
                >
                  <DigiMediaImage
                    afUnlazy
                    slot="media"
                    className="item-img"
                    afHeight="80"
                    afWidth="80"
                    afSrc={j.logo_url ? j.logo_url : placeholder}
                    afAlt={j.logo_url ? j.employer?.name : "Placeholder image"}
                  />
                  <DigiTypography afVariation={TypographyVariation.SMALL}>
                    <div>
                      <NavLink to={`/jobs/${j.id}?search=${encodeURIComponent(searchText)}`}><h3>{j.headline}</h3></NavLink>
                    </div>
                    <p>{j.occupation.label}</p>
                    <p>Publiserad {j.publication_date}</p>
                  </DigiTypography>
                </DigiLayoutMediaObject>
              </li>
            ))}
          </DigiList>

          <DigiNavigationPagination
            afTotalPages={10} //TODO: APIet retunerar ett objekt, inte ett rent nummer wth {value: 1234}
            afInitActive-page={1}
            afCurrentResultStart={1}
            afCurrentResultEnd={1}
            afTotalResults={total}
            afResultName="annonser"
            onAfOnPageChange={handlePageChange}
          />
        </div>
        ) : (
          <div>
            <NoJobsFound/>
          </div>
        )}
      </DigiLayoutContainer>  
    </DigiLayoutBlock>
  );
};
