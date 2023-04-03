const PriorityList: React.FC = () => {

    return <div className="flex-align-center">
        <p className="priority-details"><span className="low-circle-big"></span> Low</p>
        <p className="priority-details"><span className="normal-circle-big"></span> Normal</p>
        <p className="priority-details"><span className="high-circle-big"></span> High</p>
    </div>;
};

export default PriorityList;

