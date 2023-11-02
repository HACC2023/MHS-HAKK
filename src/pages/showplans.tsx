import { api } from "~/utils/api";

export default function showplans() {

    const { data, isLoading } = api.healthcare.getByPlan.useQuery({insurance: "QI"});
    if(isLoading) return <div>loading</div>;
    return (
        <>
            <p className="w-full h-full">
                {JSON.stringify(data, null, '\t')}
            </p>
        </>
    );
}