
type ThemeColor = {
    primaryColor: string;
    bgColor: string;
    textColor: string;
    textActiveColor: string;
};

type ThemeColorProps = {};

function ThemeColor(props: ThemeColorProps) {
    console.log('ThemeColor', props);

    return (
        <div>
            ThemeColor
        </div>
    );
}
export default ThemeColor;
