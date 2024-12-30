import React from 'react';

class ThreeDErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('3D Component Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial color="red" wireframe />
                </mesh>
            );
        }

        return this.props.children;
    }
}

export default ThreeDErrorBoundary;